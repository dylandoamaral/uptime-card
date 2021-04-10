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

    ha-card[hover] {
        cursor: pointer;
    }

    ha-card > div {
        padding: 0px 16px;
    }

    .flex {
        display: flex;
        display: -webkit-flex;
        min-width: 0;
    }

    .header {
        justify-content: space-between;
    }

    .name > span {
        font-size: 1.2em;
        font-weight: var(--mcg-title-font-weight, 500);
    }

    .icon {
        display: inline-block;
        flex: 0 0 1.7em;
        text-align: center;
    }

    .icon > ha-icon {
        height: 1.7em;
        width: 1.7em;
    }

    .status {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align_items: flex-end;
    }

    .status > span {
        font-size: 1em;
        font-weight: var(--mcg-title-font-weight, 500);
        max-height: 1em;
        min-height: 1em;
    }

    .status > .tooltip {
        font-size: 0.8em;
    }

    .bar {
        transition-property: height y;
        transition-duration: 0.3s;
        transition-timing-function: ease;
    }

    .timeline {
        padding-top: 10px;
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
