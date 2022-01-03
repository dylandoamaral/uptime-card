/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["uptime-card-name should return Unknown by default"] = 
`<h1 style="">
  Unknown
</h1>
`;
/* end snapshot uptime-card-name should return Unknown by default */

snapshots["uptime-card-name should return the configuration text if it exists"] = 
`<h1 style="">
  Test
</h1>
`;
/* end snapshot uptime-card-name should return the configuration text if it exists */

snapshots["uptime-card-name should return the sensor name if it exists and there is not configuration text"] = 
`<h1 style="">
  Sensor
</h1>
`;
/* end snapshot uptime-card-name should return the sensor name if it exists and there is not configuration text */

snapshots["uptime-card-name should apply translator correctly"] = 
`<h1 style="">
  Inconnue
</h1>
`;
/* end snapshot uptime-card-name should apply translator correctly */

snapshots["uptime-card-name should apply the adaptative color correclty"] = 
`<h1 style="color: #FF0000">
  Unknown
</h1>
`;
/* end snapshot uptime-card-name should apply the adaptative color correclty */

snapshots["uptime-card-name should only apply the adaptative color if configuration adaptative is True"] = 
`<h1 style="">
  Unknown
</h1>
`;
/* end snapshot uptime-card-name should only apply the adaptative color if configuration adaptative is True */

