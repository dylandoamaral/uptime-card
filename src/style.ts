import { css } from 'lit-element';

const style = css`
    :host {
        display: flex;
        flex-direction: column;
    }
    ha-card {
        flex-direction: column;
        flex: 1;
        padding: 16px 0;
        position: relative;
        overflow: hidden;
    }
    ha-card > div {
        padding: 0px 16px 16px 16px;
    }
    ha-card > div:last-child {
        padding-bottom: 0;
    }

    .flex {
        display: flex;
        display: -webkit-flex;
        min-width: 0;
    }

    .header {
        justify-content: space-between;
        padding-bottom: 0px;
    }

    .name > span {
        font-size: 1.2em;
        font-weight: var(--mcg-title-font-weight, 500);
        max-height: 1.4em;
        min-height: 1.4em;
    }

    .icon {
        color: var(--paper-item-icon-color, #44739e);
        display: inline-block;
        flex: 0 0 1.7em;
        text-align: center;
    }

    .icon > ha-icon {
        height: 1.7em;
        width: 1.7em;
    }

    .status {
        padding-bottom: 10px;
    }

    .status > span {
        font-size: 1em;
        font-weight: var(--mcg-title-font-weight, 500);
        max-height: 1em;
        min-height: 1em;
    }

    .timeline {
        padding-top: 2px;
        padding-bottom: 0px;
    }

    .footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .footer-text {
        color: #aaaaaa;
        opacity: 0.6;
    }

    .line {
        background: #aaaaaa;
        opacity: 0.3;
        flex: 1;
        margin: 0.75rem 1rem 0 1rem;
        height: 1px;
    }
`;

export default style;
