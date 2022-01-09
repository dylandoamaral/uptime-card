/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["uptime-card-icon should return mdi:heart icon by default"] = 
`<ha-icon
  class="icon"
  icon="mdi:heart"
  style=""
>
</ha-icon>
`;
/* end snapshot uptime-card-icon should return mdi:heart icon by default */

snapshots["uptime-card-icon should return the ok icon if it exists and the status is ok"] = 
`<ha-icon
  class="icon"
  icon="mdi:weather-sunny"
  style=""
>
</ha-icon>
`;
/* end snapshot uptime-card-icon should return the ok icon if it exists and the status is ok */

snapshots["uptime-card-icon should return the ko icon if it exists and the status is ko"] = 
`<ha-icon
  class="icon"
  icon="mdi:weather-night"
  style=""
>
</ha-icon>
`;
/* end snapshot uptime-card-icon should return the ko icon if it exists and the status is ko */

snapshots["uptime-card-icon should detect if the icon is an image"] = 
`<div
  class="icon"
  style="background-image: url(https://tinyurl.com/5xpp8zc5); background-size: cover;"
>
</div>
`;
/* end snapshot uptime-card-icon should detect if the icon is an image */

