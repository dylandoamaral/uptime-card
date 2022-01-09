import { css } from 'lit';

const style = css`
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

  .card {
    display: grid;
    grid-template: 'ttl ico' 'stt stt';
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
