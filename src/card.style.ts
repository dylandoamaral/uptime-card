import { css } from 'lit';

const style = css`
  .card {
    display: grid;
    grid-template: 'ttl ico' 'stt stt';
    grid-auto-rows: max-content;
    align-items: center;
  }

  .card_title {
    grid-area: ttl;
  }

  .card_icon {
    grid-area: ico;
  }

  .card_status {
    grid-area: stt;
  }
`;

export default style;
