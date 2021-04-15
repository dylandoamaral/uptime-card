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
        padding: 0px 16px;
    }

    .flex {
        display: flex;
        display: -webkit-flex;
        min-width: 0;
    }

    .information[hover] {
        cursor: pointer;
    }

    .header {
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
        gap: 4px;
    }

    .header[alignment='center'] {
        justify-content: center;
    }

    .header[alignment='left'] {
        align-self: flex-start;
    }

    .header[alignment='right'] {
        align-self: flex-end;
    }
    .header[reverse] {
        flex-direction: row-reverse;
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
        align-items: center;
        gap: 4px;
    }

    .status[alignment='center'] {
        justify-content: center;
    }

    .status[alignment='left'] {
        align-self: flex-start;
    }

    .status[alignment='right'] {
        align-self: flex-end;
    }
    .status[reverse] {
        flex-direction: row-reverse;
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
        padding-top: 6px;
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
