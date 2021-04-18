/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/camelcase */
import { fireEvent, HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import {
    css,
    CSSResult,
    customElement,
    html,
    internalProperty,
    LitElement,
    property,
    TemplateResult,
} from 'lit-element';

import {
    DEFAULT_ACTION,
    DEFAULT_ALIGNMENT,
    DEFAULT_BAR,
    DEFAULT_COLOR,
    DEFAULT_CONFIG,
    DEFAULT_SHOW,
    DEFAULT_TOOLTIP,
} from './const';
import { CardConfig } from './types/config';
import {
    DropdownProperty,
    InputProperty,
    NumberProperty,
    Option,
    Property,
    SwitchProperty,
    UnionProperty,
} from './types/editor';

@customElement('uptime-card-editor')
export class UptimeCardEditor extends LitElement implements LovelaceCardEditor {
    @property({ attribute: false }) public hass?: HomeAssistant;
    @internalProperty() private _config?: CardConfig;
    @internalProperty() private _toggle?: boolean;
    @internalProperty() private _helpers?: any;
    @internalProperty() private options?: { [id: string]: Option };
    private _initialized = false;

    public setConfig(config: CardConfig): void {
        this._config = config;

        this.loadCardHelpers();
    }

    protected shouldUpdate(): boolean {
        if (!this._initialized) {
            this._initialize();
        }

        return true;
    }

    protected render(): TemplateResult {
        if (!this.hass || !this._helpers || !this.options) {
            return html``;
        }

        this._helpers.importMoreInfoControl('climate');

        return html`
            <div class="card-config">
                ${Object.entries(this.options).map(option => this.renderOption(option[0], option[1]))}
            </div>
        `;
    }

    private renderOption(key: string, option: Option): TemplateResult {
        return html`
            <div class="option" @click=${this._toggleOption} .option=${key}>
                <div class="row">
                    <ha-icon .icon=${`mdi:${option.icon}`}></ha-icon>
                    <div class="title">${option.name}</div>
                </div>
                <div class="secondary">${option.description}</div>
            </div>

            ${option.show
                ? html`
                      <div class="values">
                          ${option.properties.map(property => this.renderProperty(property))}
                      </div>
                  `
                : ''}
        `;
    }

    private renderProperty(property: UnionProperty): TemplateResult {
        if (property.type == 'input') return this.renderInputProperty(property);
        if (property.type == 'number') return this.renderNumberProperty(property);
        if (property.type == 'dropdown') return this.renderDropdownProperty(property);
        if (property.type == 'switch') return this.renderSwitchProperty(property);
        return html``;
    }

    private renderInputProperty(property: InputProperty): TemplateResult {
        return html`
            <paper-input
                label=${property.label}
                placeholder=${property.default || ''}
                .value=${this.getPropertyValue(property)}
                .configValue=${property.name}
                .configSection=${property.section}
                @value-changed=${this._valueChanged}
            ></paper-input>
        `;
    }

    private renderNumberProperty(property: NumberProperty): TemplateResult {
        return html`
            <paper-input
                label=${property.label}
                placeholder=${property.default || ''}
                .value=${this.getPropertyValue(property)}
                .configValue=${property.name}
                .configSection=${property.section}
                .number=${true}
                @value-changed=${this._valueChanged}
                min=${property.min}
                max=${property.max}
                prevent-invalid-input
                allowed-pattern="^[0-9]+$"
            ></paper-input>
        `;
    }

    private renderSwitchProperty(property: SwitchProperty): TemplateResult {
        const checked = this.getPropertyValue(property);
        return html`
            <br />
            <ha-formfield .label=${property.label}>
                <ha-switch
                    .checked=${checked != undefined
                        ? checked
                        : property.default != undefined
                        ? property.default
                        : false}
                    .configValue=${property.name}
                    .configSection=${property.section}
                    @change=${this._valueChanged}
                ></ha-switch>
            </ha-formfield>
        `;
    }

    private renderDropdownProperty(property: DropdownProperty): TemplateResult {
        return html`
            <paper-dropdown-menu
                label=${property.label}
                .value=${this.getPropertyValue(property) || property.default || ''}
                @value-changed=${this._valueChanged}
                .configValue=${property.name}
                .configSection=${property.section}
            >
                <paper-listbox slot="dropdown-content" .selected=${property.selected}>
                    ${property.items.map(item => {
                        return html`
                            <paper-item>${item}</paper-item>
                        `;
                    })}
                </paper-listbox>
            </paper-dropdown-menu>
        `;
    }

    private getPropertyValue(property: Property): any {
        if (this._config == undefined) return undefined;
        const parent = property.section ? this._config[property.section] : this._config;
        if (parent == undefined) return undefined;
        return parent[property.name];
    }

    private _initialize(): void {
        if (this.hass === undefined) return;
        if (this._config === undefined) return;
        if (this._helpers === undefined) return;
        this._initialized = true;

        const entities = Object.keys(this.hass.states);
        const actions = ['more-info', 'url', 'navigate', 'toggle', 'call-service', 'fire-dom-event'];
        const haptics = ['success', 'warning', 'failure', 'light', 'medium', 'heavy', 'selection'];
        const alignments = ['center', 'right', 'left', 'spaced'];
        const effects = ['fade', 'shadow'];
        const targets = ['card', 'status', 'title', 'icon'];

        this.options = {
            mandatory: {
                icon: 'tune',
                name: 'Mandatory',
                description: 'Required options for this card to function',
                show: true,
                properties: [
                    {
                        type: 'dropdown',
                        items: entities,
                        name: 'entity',
                        label: 'Entity',
                        selected: entities.indexOf(this._config?.entity || ''),
                    },
                ],
            },
            customization: {
                icon: 'cog',
                name: 'Global customization',
                description: 'Customize the name, icon, etc',
                show: false,
                properties: [
                    {
                        type: 'input',
                        name: 'name',
                        label: 'Name',
                    },
                    {
                        type: 'input',
                        name: 'icon',
                        label: 'Icon',
                    },
                    {
                        type: 'input',
                        name: 'ko_icon',
                        label: 'KO Icon',
                    },
                    {
                        type: 'number',
                        name: 'severity',
                        label: 'Severity',
                        min: 0,
                        max: 100,
                        default: DEFAULT_CONFIG.severity,
                    },
                    {
                        type: 'number',
                        name: 'hours_to_show',
                        label: 'Hours to show',
                        min: 1 / 60, // One minute
                        max: 8760, // One year
                        default: DEFAULT_CONFIG.hours_to_show,
                    },
                    {
                        type: 'input',
                        name: 'ok',
                        label: 'Ok status name',
                    },
                    {
                        type: 'input',
                        name: 'ko',
                        label: 'Ko status name',
                    },
                    {
                        type: 'input',
                        name: 'status_template',
                        label: 'The template of the status',
                        default: DEFAULT_CONFIG.status_template,
                    },
                    {
                        type: 'input',
                        name: 'average_text',
                        label: 'Average text',
                        default: DEFAULT_CONFIG.average_text,
                    },
                    {
                        type: 'switch',
                        name: 'title_adaptive_color',
                        label: 'Adaptive color for title',
                        default: DEFAULT_CONFIG.title_adaptive_color,
                    },
                    {
                        type: 'switch',
                        name: 'status_adaptive_color',
                        label: 'Adaptive color for status',
                        default: DEFAULT_CONFIG.status_adaptive_color,
                    },
                    {
                        type: 'switch',
                        name: 'icon_adaptive_color',
                        label: 'Adaptive color for icon',
                        default: DEFAULT_CONFIG.icon_adaptive_color,
                    },
                    {
                        type: 'switch',
                        name: 'tooltip_adaptive_color',
                        label: 'Adaptive color for tooltip',
                        default: DEFAULT_CONFIG.tooltip_adaptive_color,
                    },
                ],
            },
            bar: {
                icon: 'chart-bar',
                name: 'Bar customization',
                description: 'Customize the bar style',
                show: false,
                properties: [
                    {
                        type: 'number',
                        name: 'height',
                        section: 'bar',
                        label: 'Height',
                        min: 4,
                        max: 200,
                        default: DEFAULT_BAR.height,
                    },
                    {
                        type: 'number',
                        name: 'round',
                        section: 'bar',
                        label: 'Round corner ratio',
                        min: 0,
                        max: 100,
                        default: DEFAULT_BAR.round,
                    },
                    {
                        type: 'number',
                        name: 'spacing',
                        section: 'bar',
                        label: 'Spacing',
                        min: 0,
                        max: 10,
                        default: DEFAULT_BAR.spacing,
                    },
                    {
                        type: 'number',
                        name: 'amount',
                        section: 'bar',
                        label: 'Amount',
                        min: 1,
                        max: 100,
                        default: DEFAULT_BAR.amount,
                    },
                ],
            },
            color: {
                icon: 'palette',
                name: 'Color customization',
                description: 'Customize the color palette',
                show: false,
                properties: [
                    {
                        type: 'input',
                        name: 'ok',
                        section: 'color',
                        label: "Ok's element color",
                        default: DEFAULT_COLOR.ok,
                    },
                    {
                        type: 'input',
                        name: 'ko',
                        section: 'color',
                        label: "Ko's element color",
                        default: DEFAULT_COLOR.ko,
                    },
                    {
                        type: 'input',
                        name: 'none',
                        section: 'color',
                        label: "Unknown's element color",
                        default: DEFAULT_COLOR.none,
                    },
                    {
                        type: 'input',
                        name: 'half',
                        section: 'color',
                        label: "Half's element color",
                        default: DEFAULT_COLOR.half,
                    },
                    {
                        type: 'input',
                        name: 'title',
                        section: 'color',
                        label: 'Title text color',
                        default: DEFAULT_COLOR.title,
                    },
                    {
                        type: 'input',
                        name: 'status',
                        section: 'color',
                        label: 'Status text color',
                        default: DEFAULT_COLOR.status,
                    },
                    {
                        type: 'input',
                        name: 'icon',
                        section: 'color',
                        label: 'Icon color',
                    },
                    {
                        type: 'input',
                        name: 'tooltip',
                        section: 'color',
                        label: 'Tooltip text color',
                        default: DEFAULT_COLOR.tooltip,
                    },
                ],
            },
            show: {
                icon: 'eye',
                name: 'Toggle elements',
                description: 'Show or hide uptime card elements',
                show: false,
                properties: [
                    {
                        type: 'switch',
                        name: 'header',
                        section: 'show',
                        label: 'Toggle header',
                        default: DEFAULT_SHOW.header,
                    },
                    {
                        type: 'switch',
                        name: 'title',
                        section: 'show',
                        label: 'Toggle title',
                        default: DEFAULT_SHOW.title,
                    },
                    {
                        type: 'switch',
                        name: 'icon',
                        section: 'show',
                        label: 'Toggle icon',
                        default: DEFAULT_SHOW.icon,
                    },
                    {
                        type: 'switch',
                        name: 'status',
                        section: 'show',
                        label: 'Toggle status',
                        default: DEFAULT_SHOW.status,
                    },
                    {
                        type: 'switch',
                        name: 'timeline',
                        section: 'show',
                        label: 'Toggle timeline',
                        default: DEFAULT_SHOW.timeline,
                    },
                    {
                        type: 'switch',
                        name: 'footer',
                        section: 'show',
                        label: 'Toggle footer',
                        default: DEFAULT_SHOW.footer,
                    },
                    {
                        type: 'switch',
                        name: 'average',
                        section: 'show',
                        label: 'Toggle average',
                        default: DEFAULT_SHOW.average,
                    },
                ],
            },
            alias: {
                icon: 'reload',
                name: 'Alias',
                description: 'Replace status name by alias',
                show: false,
                properties: [
                    {
                        type: 'input',
                        name: 'ok',
                        section: 'alias',
                        label: 'Alias for Ok status',
                    },
                    {
                        type: 'input',
                        name: 'ko',
                        section: 'alias',
                        label: 'Alias for Ko status',
                    },
                ],
            },
            tooltip: {
                icon: 'tooltip-text',
                name: 'Tooltip elements',
                description: 'Handle tooltip information',
                show: false,
                properties: [
                    {
                        type: 'switch',
                        name: 'hour24',
                        section: 'tooltip',
                        label: 'Set to true to display times in 24-hour format.',
                        default: DEFAULT_TOOLTIP.hour24,
                    },
                    {
                        type: 'switch',
                        name: 'animation',
                        section: 'tooltip',
                        label: 'Set to true to show the animation.',
                        default: DEFAULT_TOOLTIP.animation,
                    },
                    {
                        type: 'input',
                        name: 'template',
                        section: 'tooltip',
                        label: 'Template of the tooltip.',
                        default: DEFAULT_TOOLTIP.template,
                    },
                ],
            },
            tap_action: {
                icon: 'gesture-tap',
                name: 'Tap action elements',
                description: 'Handle tap action information',
                show: false,
                properties: [
                    {
                        type: 'dropdown',
                        items: actions,
                        name: 'action',
                        section: 'tap_action',
                        label: 'Action to perform.',
                        selected: actions.indexOf(this._config?.tap_action?.action || DEFAULT_ACTION.action),
                    },
                    {
                        type: 'input',
                        name: 'entity',
                        section: 'tap_action',
                        label: '(Only for more-info) Override the entity for more information.',
                    },
                    {
                        type: 'input',
                        name: 'navigation_path',
                        section: 'tap_action',
                        label: '(Only for navigate) Path to navigate to (e.g. `/lovelace/0/`).',
                    },
                    {
                        type: 'input',
                        name: 'url_path',
                        section: 'tap_action',
                        label: '(Only for url) URL to open.',
                    },
                    {
                        type: 'input',
                        name: 'service',
                        section: 'tap_action',
                        label: '(Only for call-service) Service to call.',
                    },
                    {
                        type: 'input',
                        name: 'service-data',
                        section: 'tap_action',
                        label: '(Only for call-service) Service data to include.',
                    },
                    {
                        type: 'dropdown',
                        items: haptics,
                        name: 'haptic',
                        section: 'tap_action',
                        label: 'Haptic feedback.',
                        selected: actions.indexOf(this._config?.tap_action?.haptic || ''),
                    },
                ],
            },
            alignment: {
                icon: 'ruler',
                name: 'Alignment',
                description: 'Align elements from the card',
                show: false,
                properties: [
                    {
                        type: 'dropdown',
                        items: alignments,
                        name: 'header',
                        section: 'alignment',
                        label: 'Alignment of the header.',
                        selected: alignments.indexOf(this._config?.alignment?.header || DEFAULT_ALIGNMENT.header),
                    },
                    {
                        type: 'switch',
                        name: 'icon_first',
                        section: 'alignment',
                        label: 'Set to true if the icon should be placed before the title.',
                        default: DEFAULT_ALIGNMENT.icon_first,
                    },
                    {
                        type: 'dropdown',
                        items: alignments,
                        name: 'status',
                        section: 'alignment',
                        label: 'Alignment of the status.',
                        selected: alignments.indexOf(this._config?.alignment?.status || DEFAULT_ALIGNMENT.status),
                    },
                    {
                        type: 'switch',
                        name: 'tooltip_first',
                        section: 'alignment',
                        label: 'Set to true if the tooltip should be placed before the state.',
                        default: DEFAULT_ALIGNMENT.tooltip_first,
                    },
                ],
            },
            blink: {
                icon: 'alert',
                name: 'Blink customization',
                description: 'Customize blink',
                show: false,
                properties: [
                    {
                        type: 'dropdown',
                        items: effects,
                        name: 'effect',
                        section: 'blink',
                        label: 'The blink effect.',
                        selected: effects.indexOf(this._config?.blink?.effect),
                    },
                    {
                        type: 'dropdown',
                        items: targets,
                        name: 'target',
                        section: 'blink',
                        label: 'Set the component to blink.',
                        selected: targets.indexOf(this._config?.blink?.target),
                    },
                    {
                        type: 'number',
                        name: 'speed',
                        label: 'The animation speed.',
                        section: 'blink',
                        min: 0,
                        max: 100,
                    },
                ],
            },
        };
    }

    private async loadCardHelpers(): Promise<void> {
        this._helpers = await (window as any).loadCardHelpers();
    }

    private _toggleOption(ev): void {
        if (this.options == undefined) return undefined;

        const show = !this.options[ev.target.option].show;
        for (const [key] of Object.entries(this.options)) {
            this.options[key].show = false;
        }
        this.options[ev.target.option].show = show;
        this._toggle = !this._toggle;
    }

    private _valueChanged(ev): void {
        if (!this._config || !this.hass) {
            return;
        }
        const target = ev.target;
        const section = target.configSection;
        const config = { ...this._config };
        const parent = (section ? { ...config[section] } : config) || {};

        if (target.configValue) {
            if ((target.value === undefined && target.checked === undefined) || target.value === '') {
                delete parent[target.configValue];
                if (section) this._config = { ...config, [section]: parent };
                else this._config = { ...parent };
            } else {
                const key = target.configValue;
                const rawValue = target.checked !== undefined ? target.checked : target.value;
                const value = target.number ? parseFloat(rawValue) : rawValue;

                if (section) {
                    this._config = {
                        ...config,
                        [section]: { ...config[section], [key]: value },
                    };
                } else {
                    this._config = {
                        ...config,
                        [key]: value,
                    };
                }
            }
        }
        fireEvent(this, 'config-changed', { config: this._config });
    }

    static get styles(): CSSResult {
        return css`
            .option {
                padding: 4px 0px;
                cursor: pointer;
            }
            .row {
                display: flex;
                margin-bottom: -14px;
                pointer-events: none;
            }
            .title {
                padding-left: 16px;
                margin-top: -6px;
                pointer-events: none;
            }
            .secondary {
                padding-left: 40px;
                color: var(--secondary-text-color);
                pointer-events: none;
            }
            .values {
                padding-left: 16px;
                background: var(--secondary-background-color);
                display: grid;
            }
            ha-formfield {
                padding-bottom: 8px;
            }
        `;
    }
}
