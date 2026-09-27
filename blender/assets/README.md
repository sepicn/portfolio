# Third-party assets

Models imported by `build_room.py`. The sources are listed so they can be downloaded again.
Licences are as declared by the uploaders.

## Poly Haven (CC0, no attribution required)

| Folder                      | Source                                            | Licence |
| --------------------------- | ------------------------------------------------- | ------- |
| `standing_picture_frame_01` | https://polyhaven.com/a/standing_picture_frame_01 | CC0     |
| `boombox`                   | https://polyhaven.com/a/boombox                   | CC0     |
| `potted_plant_04`           | https://polyhaven.com/a/potted_plant_04           | CC0     |

## BlendSwap

Converted from the original `.blend` files by `convert_blendswap.py`, which keeps only the
geometry and swaps in the room's materials (the source files are not in the repo).

| Folder           | Used as                        | Source                                                   | Author        | Licence   |
| ---------------- | ------------------------------ | -------------------------------------------------------- | ------------- | --------- |
| `retro_computer` | CRT monitor, tower, keyboard   | [Retro computer](https://blendswap.com/blend/26625)      | senmurai      | CC BY 4.0 |
| `office_chair`   | desk chair                     | [Office Chair](https://blendswap.com/blend/14931)        | PrinterKiller | CC0       |
| `open_book`      | open book on the desk          | [book](https://blendswap.com/blend/12893)                | gabriel       | CC0       |
| `neon_sign`      | backing panel of the name sign | [Realistic Neon sign](https://blendswap.com/blend/22748) | kexsz         | CC0       |

### Icon-only models

Not in the room; `render_props.py` renders them for the ticker on the about page.

| Folder          | Used as               | Source                                            | Author      | Licence |
| --------------- | --------------------- | ------------------------------------------------- | ----------- | ------- |
| `running_shoes` | running shoes icon    | [Nike Air Max](https://blendswap.com/blend/29610) | cyanogenmod | CC0     |
| `gameboy`       | handheld console icon | modelled by `build_gameboy.py`                    | -           | own     |

`running_shoes` comes from `convert_icons.py`, which drops the brand logo and maps the
procedural materials to the site palette.

Attribution for the CC BY model: "Retro computer" by senmurai
(https://blendswap.com/profile/1185268), licensed under
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), converted to glTF and recoloured.
The site footer carries the same credit.

The book's source file has page and cover textures scanned from a published cookbook; the
CC0 declaration cannot cover those, so only its geometry is used.

`portrait.png` is Nikola's own photo, used as the picture in the desk frame.
