/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["generateCSS should generate a correct css"] = 
`.test {
 color: red;
 background-color: blue;
}
`;
/* end snapshot generateCSS should generate a correct css */

snapshots["generateCSS can generate a css with multiple class"] = 
`.test {
 color: red;
 background-color: blue;
}

.test_subtest {
 font-size: 15px;
}
`;
/* end snapshot generateCSS can generate a css with multiple class */

snapshots["generateClass should generate a correct class css"] = 
`.test {
 color: red;
 background-color: blue;
}
`;
/* end snapshot generateClass should generate a correct class css */

