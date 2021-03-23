/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/camelcase */
import {
  LitElement,
  html,
  customElement,
  property,
  TemplateResult,
  CSSResult,
  css,
  internalProperty,
} from 'lit-element';
import { HomeAssistant, fireEvent, LovelaceCardEditor } from 'custom-card-helpers';
import { DEFAULT_COLOR, DEFAULT_CONFIG, DEFAULT_SHOW, DEFAULT_BAR, DEFAULT_ICON } from "./const";

import { CardConfig } from './types';

const options = {
  required: {
    icon: 'tune',
    name: 'Mandatory',
    secondary: 'Required options for this card to function',
    show: true,
  },
  customization: {
    icon: 'cog',
    name: 'Global customization',
    secondary: 'Customize the name, icon, etc',
    show: false,
  },
  bar: {
    icon: 'chart-bar',
    name: 'Bar customization',
    secondary: 'Customize the bar style',
    show: false,
  },
  color: {
    icon: 'palette',
    name: 'Color customization',
    secondary: 'Customize the color palette',
    show: false,
  },
  show: {
    icon: 'eye',
    name: 'Toggle elements',
    secondary: 'Show or hide uptime card elements',
    show: false,
  },
  alias: {
    icon: 'reload',
    name: 'Alias',
    secondary: 'Replace status name by alias',
    show: false,
  },
};

@customElement('uptime-card-editor')
export class UptimeCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @internalProperty() private _config?: CardConfig;
  @internalProperty() private _toggle?: boolean;
  @internalProperty() private _helpers?: any;
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

  protected render(): TemplateResult | void {
    if (!this.hass || !this._helpers) {
      return html``;
    }

    // The climate more-info has ha-switch and paper-dropdown-menu elements that are lazy loaded unless explicitly done here
    this._helpers.importMoreInfoControl('climate');

    // You can restrict on domain type
    const entities = Object.keys(this.hass.states).filter(eid => eid.substr(0, eid.indexOf('.')) === 'binary_sensor');

    return html`
      <!-- Required -->
      <div class="card-config">
        <div class="option" @click=${this._toggleOption} .option=${'required'}>
          <div class="row">
            <ha-icon .icon=${`mdi:${options.required.icon}`}></ha-icon>
            <div class="title">${options.required.name}</div>
          </div>
          <div class="secondary">${options.required.secondary}</div>
        </div>
        ${options.required.show
          ? html`
              <div class="values">
                <paper-dropdown-menu
                  label="Entity (Required)"
                  .value=${this._config?.entity || ""}
                  @value-changed=${this._valueChanged}
                  .configValue=${'entity'}
                >
                  <paper-listbox slot="dropdown-content" .selected=${entities.indexOf(this._config?.entity || '')}>
                    ${entities.map(entity => {
                      return html`
                        <paper-item>${entity}</paper-item>
                      `;
                    })}
                  </paper-listbox>
                </paper-dropdown-menu>
              </div>
            `
      : ''}

      <!-- Global customization -->
        <div class="option" @click=${this._toggleOption} .option=${'customization'}>
          <div class="row">
            <ha-icon .icon=${`mdi:${options.customization.icon}`}></ha-icon>
            <div class="title">${options.customization.name}</div>
          </div>
          <div class="secondary">${options.customization.secondary}</div>
        </div>
        ${options.customization.show
          ? html`
              <div class="values">
                <paper-input
                  label="Name"
                  .value=${this._config?.name || 'Uptime'}
                  .configValue=${'name'}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <paper-input
                  label="Icon"
                  .value=${this._config?.icon || DEFAULT_ICON}
                  .configValue=${'icon'}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <paper-input
                  label="Severity in %"
                  .value=${this._config?.severity || DEFAULT_CONFIG.severity}
                  .configValue=${'severity'}
                  .number=${true}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <paper-input
                  label="Hours to show"
                  .value=${this._config?.hours_to_show || DEFAULT_CONFIG.hours_to_show}
                  .configValue=${'hours_to_show'}
                  .number=${true}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <paper-input
                  label="Ok status name"
                  .value=${this._config?.ok || ''}
                  .configValue=${'ok'}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <paper-input
                  label="Ko status name"
                  .value=${this._config?.ko || ''}
                  .configValue=${'ko'}
                  @value-changed=${this._valueChanged}
                ></paper-input>
              </div>
            `
      : ''}

      <!-- Bar customization -->
      <div class="option" @click=${this._toggleOption} .option=${'bar'}>
          <div class="row">
            <ha-icon .icon=${`mdi:${options.bar.icon}`}></ha-icon>
            <div class="title">${options.bar.name}</div>
          </div>
          <div class="secondary">${options.bar.secondary}</div>
        </div>
        ${options.bar.show
          ? html`
              <div class="values">
                <paper-input
                  label="Height"
                  .value=${this._config?.bar.height || DEFAULT_BAR.height}
                  .configValue=${'height'}
                  .configSection=${'bar'}
                  .number=${true}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <paper-input
                  label="Round corner"
                  .value=${this._config?.bar.round || DEFAULT_BAR.round}
                  .configValue=${'round'}
                  .configSection=${'bar'}
                  .number=${true}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <paper-input
                  label="Spacing"
                  .value=${this._config?.bar.spacing || DEFAULT_BAR.spacing}
                  .configValue=${'spacing'}
                  .configSection=${'bar'}
                  .number=${true}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <paper-input
                  label="Amount"
                  .value=${this._config?.bar.amount || DEFAULT_BAR.amount}
                  .configValue=${'amount'}
                  .configSection=${'bar'}
                  .number=${true}
                  @value-changed=${this._valueChanged}
                ></paper-input>
              </div>
            `
      : ''}

      <!-- Color customization -->
      <div class="option" @click=${this._toggleOption} .option=${'color'}>
          <div class="row">
            <ha-icon .icon=${`mdi:${options.color.icon}`}></ha-icon>
            <div class="title">${options.color.name}</div>
          </div>
          <div class="secondary">${options.color.secondary}</div>
        </div>
        ${options.color.show
          ? html`
              <div class="values">
                <paper-input
                  label="Ok"
                  .value=${this._config?.color?.ok || DEFAULT_COLOR.ok}
                  .configValue=${'ok'}
                  .configSection=${'color'}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <paper-input
                  label="Ko"
                  .value=${this._config?.color?.ko || DEFAULT_COLOR.ko}
                  .configValue=${'ko'}
                  .configSection=${'color'}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <paper-input
                  label="Half"
                  .value=${this._config?.color?.half || DEFAULT_COLOR.half}
                  .configValue=${'half'}
                  .configSection=${'color'}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <paper-input
                  label="None"
                  .value=${this._config?.color?.none || DEFAULT_COLOR.none}
                  .configValue=${'none'}
                  .configSection=${'color'}
                  @value-changed=${this._valueChanged}
                ></paper-input>
              </div>
              `
      : ''}

      <!-- Show/hide elements -->
      <div class="option" @click=${this._toggleOption} .option=${'show'}>
          <div class="row">
            <ha-icon .icon=${`mdi:${options.show.icon}`}></ha-icon>
            <div class="title">${options.show.name}</div>
          </div>
          <div class="secondary">${options.show.secondary}</div>
        </div>
        ${options.show.show
          ? html`
              <div class="values">
                <br />
                <ha-formfield .label=${`Toggle header`}>
                  <ha-switch
                    .checked=${this._config?.show?.header !== false}
                    .configValue=${'header'}
                    .configSection=${'show'}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
                <br />
                <ha-formfield .label=${`Toggle icon`}>
                  <ha-switch
                    .checked=${this._config?.show?.icon !== false}
                    .configValue=${'icon'}
                    .configSection=${'show'}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
                <br />
                <ha-formfield .label=${`Toggle status`}>
                  <ha-switch
                    .checked=${this._config?.show?.status !== false}
                    .configValue=${'status'}
                    .configSection=${'show'}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
                <br />
                <ha-formfield .label=${`Toggle timeline`}>
                  <ha-switch
                    .checked=${this._config?.show?.timeline !== false}
                    .configValue=${'timeline'}
                    .configSection=${'show'}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
                <br />
                <ha-formfield .label=${`Toggle footer`}>
                  <ha-switch
                    .checked=${this._config?.show?.footer !== false}
                    .configValue=${'footer'}
                    .configSection=${'show'}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
              </div>
            `
      : ''}

      <!-- Alias -->
      <div class="option" @click=${this._toggleOption} .option=${'alias'}>
          <div class="row">
            <ha-icon .icon=${`mdi:${options.alias.icon}`}></ha-icon>
            <div class="title">${options.alias.name}</div>
          </div>
          <div class="secondary">${options.alias.secondary}</div>
        </div>
        ${options.alias.show
          ? html`
              <div class="values">
                <paper-input
                  label="Ok"
                  .value=${this._config?.alias?.ok || ""}
                  .configValue=${'ok'}
                  .configSection=${'alias'}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <paper-input
                  label="Ko"
                  .value=${this._config?.alias?.ko || ""}
                  .configValue=${'ko'}
                  .configSection=${'alias'}
                  @value-changed=${this._valueChanged}
                ></paper-input>
              </div>
            `
      : ''}

      </div>
    `;
  }

  private _initialize(): void {
    if (this.hass === undefined) return;
    if (this._config === undefined) return;
    if (this._helpers === undefined) return;
    this._initialized = true;
  }

  private async loadCardHelpers(): Promise<void> {
    this._helpers = await (window as any).loadCardHelpers();
  }

  private _toggleOption(ev): void {
    this._toggleThing(ev, options);
  }

  private _toggleThing(ev, optionList): void {
    const show = !optionList[ev.target.option].show;
    for (const [key] of Object.entries(optionList)) {
      optionList[key].show = false;
    }
    optionList[ev.target.option].show = show;
    this._toggle = !this._toggle;
  }

  private _valueChanged(ev): void {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.target;
    const section = target.configSection
    const config = {... this._config}
    const parent = section ? config[section] : config
    
    if (target.configValue) {
      if (target.value === undefined && target.checked === undefined) {
        delete parent[target.configValue];
        this._config = config;
      } else if (target.value === "") {
        delete parent[target.configValue];
        this._config = config;
      } else {
        const key = target.configValue
        const rawValue = target.checked !== undefined ? target.checked : target.value
        const value = target.number ? parseFloat(rawValue) : rawValue

        if (section) {
          this._config = {
            ...config,
            [section]: {... config[section], [key]: value}
          }
        } else {
          this._config = {
            ...config,
            [key]: value
          }
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
