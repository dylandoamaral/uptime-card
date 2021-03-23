import { LovelaceCard, LovelaceCardEditor } from 'custom-card-helpers';

declare global {
    interface HTMLElementTagNameMap {
        'uptime-card-editor': LovelaceCardEditor;
        'hui-error-card': LovelaceCard;
    }
}