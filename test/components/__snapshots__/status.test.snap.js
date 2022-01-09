/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["uptime-card-status should return Unknown by default"] = 
`<span
  class="status"
  style=""
>
  Unknown
</span>
`;
/* end snapshot uptime-card-status should return Unknown by default */

snapshots["uptime-card-status should return the ok alias if it exists and the status is ok"] = 
`<span
  class="status"
  style=""
>
  Good
</span>
`;
/* end snapshot uptime-card-status should return the ok alias if it exists and the status is ok */

snapshots["uptime-card-status should return the ko alias if it exists and the status is ko"] = 
`<span
  class="status"
  style=""
>
  Bad
</span>
`;
/* end snapshot uptime-card-status should return the ko alias if it exists and the status is ko */

snapshots["uptime-card-status should return the ok default text if there is no alias and the status is ok"] = 
`<span
  class="status"
  style=""
>
  On
</span>
`;
/* end snapshot uptime-card-status should return the ok default text if there is no alias and the status is ok */

snapshots["uptime-card-status should return the ko default text ifithere is no alias and the status is ko"] = 
`<span
  class="status"
  style=""
>
  Off
</span>
`;
/* end snapshot uptime-card-status should return the ko default text ifithere is no alias and the status is ko */

