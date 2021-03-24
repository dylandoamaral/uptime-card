# Uptime Card

A minimalist card inspired by [reddit status](https://www.redditstatus.com/) UI to display binary sensors in a nice way.

<p align="center">
  <img src="https://raw.githubusercontent.com/dylandoamaral/uptime-card/main/images/showcase.png" />
</p>

## Install  🏠

### Manual install

1. Download and copy `uptime-card.js` from the [latest release](https://github.com/dylandoamaral/uptime-card/releases/latest) into your `config/www` directory.

2. Add the resource reference inside your `configuration.yaml`.

3. Add the custom card to your panel and 🚀.

## Configurations ⚙️

Uptime card is highly customizable.

Option from version `v0.0.2` are not available yet since it is the work in progress release.

### Global configuration

| Name | Type | Default | Since | Description |
|------|:----:|:-------:|:-----:|-------------|
| entity **required** | string |  | v0.0.1 | Set the binary sensor entity id.
| name | string |  | v0.0.1 | Set a custom title to the card.
| icon | string |  | v0.0.1 | Set a custom icon from [mdi icons](https://iconify.design/icon-sets/mdi/).
| ok **[for more information](https://github.com/dylandoamaral/uptime-card#on-and-off-options)** | string |  | v0.0.1 | Set the state name corresponding to on.
| ko **[for more information](https://github.com/dylandoamaral/uptime-card#on-and-off-options)** | string |  | v0.0.1 | Set the state name corresponding to off.
| severity | number | 100 | v0.0.1 | Set a threshold in percentage to specify when a bar both ok and ko is red instead of yellow.
| hours_to_show | number | 24 | v0.0.1 | Set the number of hours to show.
| update_interval | number | | v0.0.1 | Set the an interval for the card to update.
| average_text | string | % | v0.0.2 | Set the average text.

### Bar configuration

**Parent key:** bar

| Name | Type | Default | Since | Description |
|------|:----:|:-------:|:-----:|-------------|
| height | number | 46 | v0.0.1 | Set the height of the bars.
| round | number | 1 | v0.0.1 | Set the round radius for the bars.
| spacing | number | 4 | v0.0.1 | Set the spacing between the bars.
| amount | number | 36 | v0.0.1 | Set the number bars.

### Color configuration

**Parent key:** color

| Name | Type | Default | Since | Description |
|------|:----:|:-------:|:-----:|-------------|
| ok | color | #45C669 | v0.0.1 | Set the ok color.
| ko | color | #C66445 | v0.0.1 | Set the ko color.
| half | color | #C6B145 | v0.0.1 | Set the half color.
| none | color | #C9C9C9 | v0.0.1 | Set the none color.

### Show configuration

**Parent key:** show

| Name | Type | Default | Since | Description |
|------|:----:|:-------:|:-----:|-------------|
| header | boolean | true | v0.0.1 | Show the header.
| icon | boolean | true | v0.0.1 | Show the icon.
| status | boolean | true | v0.0.1 | Show the status.
| timeline | boolean | true | v0.0.1 | Show the timeline.
| footer | boolean | true | v0.0.1 | Show the footer.
| average | boolean | true | v0.0.2 | Show the average.

### Alias configuration

**Parent key:** alias

| Name | Type | Default | Since | Description |
|------|:----:|:-------:|:-----:|-------------|
| ok | string | | v0.0.1 | Set a friendly name for ok state.
| ko | string | | v0.0.1 | Set a friendly name for ko state.

## Example 📊

Here is an example with pretty much every options:

<p align="center">
  <img src="https://raw.githubusercontent.com/dylandoamaral/uptime-card/main/images/example.png" />
</p>

```yaml
type: 'custom:uptime-card'
entity: binary_sensor.updater
name: Updater
icon: 'mdi:server'
severity: 100
hours_to_show: 100
update_interval: 100
ok: 'on'
ko: 'off'
average_text: '% uptime'
bar:
  height: 55
  spacing: 4
  round: 2
  amount: 72
color:
  ok: '#B0E0E6'
  ko: '#C66445'
  half: '#C6B145'
  none: '#C9C9C9'
show:
  header: true
  icon: true
  status: true
  footer: true
  option: true
  timeline: true
  average: true
alias:
  ko: No Update !
  ok: Update available !
```

## Roadmap 🗺️

Roadmap for version 0.1.0.

- [ ] Add the card to HACS
- [ ] Polish code
- [ ] Polish editor (new swatch input and number input)
- [ ] Clickable card (link to website or show history)
- [ ] Polish CSS
- [ ] Add more customizations

## Additional information ℹ️
### Ok and ko options

By default, the uptime card will be in `unknown` state because it doesn't know which status correspond to an `ok` signal or a `ko` signal. You can specify it using either `ok` or `ko` options.

These options follow the following rules:
- if ok is not defined and ko is not defined -> `unknown`
- if ok is defined and ko is not defined:
  - if the state name equals ok -> `ok`
  - if not -> `ko`
- if ok is not defined and ko is defined:
  - if the state name equals ko -> `ko`
  - if not -> `ok`
- if ok is defined and ok is defined:
  - if the state name equals ok -> `ok`
  - if the state name equals ko -> `ko`
  - if not -> `unknown`

### Contribution

Don't hesitate to ask for features or to contribute yourself ⭐.

### Inspiration

This repository is inspired by [mini-graph-card](https://github.com/kalkih/mini-graph-card) and [boilerplate-card](https://github.com/custom-cards/boilerplate-card).