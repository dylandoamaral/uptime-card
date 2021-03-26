import { LovelaceCardEditor } from 'custom-card-helpers';

declare global {
    interface HTMLElementTagNameMap {
        'uptime-card-editor': LovelaceCardEditor;
    }
}
