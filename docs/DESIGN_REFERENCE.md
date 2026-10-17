# UI sources and design reference

The playback buttons, slider styles and curved dark tray use the original SVG/CSS from [DavidJCobb/wmp-svg](https://github.com/DavidJCobb/wmp-svg), reviewed revision `84df38f3cebcc0d6d34547b60afd1beb5dbec3d7`. Its original wmplayer.css is preserved at the beginning of the stylesheet. App integration rules follow an explicit marker, covering the visualization, toolbar, playlist, metadata and responsive behavior.

The compact top navigation's gray/violet highlight, black lower band and blue active label were visually informed by [Ingan121/WMPotify](https://github.com/Ingan121/WMPotify), revision `6aa2b5f0b40fdfc596590a6f4c473cffac65ee4a`. This navigation is independently styled in CSS. No WMPotify bitmap skin resources, compiled themes or screenshots are included.

WMPotify's MIT grant excludes files listed in its [.licignore](https://github.com/Ingan121/WMPotify/blob/6aa2b5f0b40fdfc596590a6f4c473cffac65ee4a/.licignore), including theme/src/resources and theme/dist. Those resources from the separate reference experiment have not been imported.

The custom chrome-dark.svg footer and earlier experimental Aero shell are not included. Existing wmp-svg permission status is described in THIRD_PARTY_NOTICES.md and LICENSING.md.
