/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["uptime-card-title should return Unknown by default"] = 
`<h2
  class="title"
  style=""
>
  Unknown
</h2>
`;
/* end snapshot uptime-card-title should return Unknown by default */

snapshots["uptime-card-title should return the configuration text if it exists"] = 
`<h2
  class="title"
  style=""
>
  Test
</h2>
`;
/* end snapshot uptime-card-title should return the configuration text if it exists */

snapshots["uptime-card-title should return the sensor name if it exists and there is not configuration text"] = 
`<h2
  class="title"
  style=""
>
  Sensor
</h2>
`;
/* end snapshot uptime-card-title should return the sensor name if it exists and there is not configuration text */

snapshots["uptime-card-title should apply translator correctly"] = 
`<h2
  class="title"
  style=""
>
  Inconnue
</h2>
`;
/* end snapshot uptime-card-title should apply translator correctly */

snapshots["uptime-card-title should apply the adaptative color correclty"] = 
`<h2
  class="title"
  style="color: #FF0000"
>
  Unknown
</h2>
`;
/* end snapshot uptime-card-title should apply the adaptative color correclty */

snapshots["uptime-card-title should only apply the adaptative color if configuration adaptative is True"] = 
`<h2
  class="title"
  style=""
>
  Unknown
</h2>
`;
/* end snapshot uptime-card-title should only apply the adaptative color if configuration adaptative is True */

