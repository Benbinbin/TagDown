# TagDown

<p align="center">
    <img style="width: 60%; padding:5rem" src="https://user-images.githubusercontent.com/40909550/132101266-ebb79e42-4f1d-45bb-ba61-4013c9fb63ed.png"/>
</p>

<p align="center">一款增强型的书签管理插件</p>

## 简介
TagDown 是一款开源的书签管理插件， 您可以使用扩展程序*浏览*、*新增*、*修改*书签，它也支持以不同方式*导出*书签。

![UI](https://user-images.githubusercontent.com/40909550/137291507-f04ce62e-82fc-4835-ad9d-7c98aa07cdbd.png)

:link: [Introduction English Version](./README.md)

## 特点

* 支持 :clapper: [新增](https://www.bilibili.com/video/BV1up4y1s7VP?p=4)书签，并附加额外的信息，例如 `tags`、`groups` 等
* 支持 :clapper: [导出](https://www.bilibili.com/video/BV1up4y1s7VP?p=7)任意书签为 `json` 文档
* 以 :clapper: [树图](https://www.bilibili.com/video/BV1up4y1s7VP?p=3)的形式浏览层级结构的书签数据
* 一键打开多个书签，支持在 :clapper: [标签组](https://www.bilibili.com/video/BV1up4y1s7VP)内打开书签

数据保存在本地，额外附加的信息是「非破坏性」的，即卸载扩展程序后，不会影响浏览器的书签数据

## 安装
1. 下载最新版本的 [TagDown](https://github.com/Benbinbin/TagDown/releases) `zip` 文件并解压
2. 根据官方[指南](https://developer.chrome.com/docs/extensions/mv2/getstarted/#:~:text=added%20as%20an%20extension%20in%20developer%20mode%20in%20its%20current%20state)「加载已解压的扩展程序」：
    * 打开 Chrome 浏览器并访问 `chrome://extensions` 网址
    * 在页面的右上角激活 `开发者模式`
    * 点击左上角 `加载已解压的扩展程序` 选择解压后的文件夹以安装扩展程序
3. 然后您可以使用此扩展程序和 Chrome 作为您的书签管理器。请尝试使用！

:bulb: :clapper: [此系列视频](https://www.bilibili.com/video/BV1up4y1s7VP)是关于扩展程序的使用说明

## 数据
TagDown 使用 Chrome 提供的 APIs 与书签和标签进行交互，它不依赖于任何后台服务器，所以**所有数据都存储在本地浏览器中**。

:bulb: 如果您的 Chrome 浏览器登录账号，并[打开同步选项](https://support.google.com/chrome/answer/185277)，书签将由 Google 进行同步，这样您可以使用同一账户在不同设备之间共享书签（如果您使用微软推出的 Edge 浏览器，它也是基于 Chromium 内核进行开发的，也可以安装该插件，书签将由微软进行[同步](https://support.microsoft.com/en-us/microsoft-edge/sign-in-to-sync-microsoft-edge-across-devices-e6ffa79b-ed52-aa32-47e2-5d5597fe4674)）。

除了通过调用 Chrome 的 APIs 来使用书签外，TagDown 还将一些数据保存在 **[IndexedDB](https://developer.mozilla.org/zh-TW/docs/Web/API/IndexedDB_API)** 中，这是一个由浏览器提供的数据库，用于持久性地存储数据。当您 :clapper: **[通过 TagDown 添加新书签](https://www.bilibili.com/video/BV1up4y1s7VP?p=4)**，可以为新书签提供额外的信息，如 `tags`、`groups` 和 `description` 等，这些数据将保存在 IndexedDB 中，它们**不会**被 Google 同步，它总是保存在本地。

TagDown 提供了 :clapper: [`export` 和 `import` 功能](https://www.bilibili.com/video/BV1up4y1s7VP?p=10)，您可以将整个 IndexedDB 数据库导出为 `json` 文件并保存在您指定的地方作为备份，并通过导入该文件恢复数据库。

:bulb: Chrome 会为每个书签分配一个唯一的 ID，TagDown 使用这个唯一的 ID 作为 IndexedDB 的索引，将数据库中不同部分的数据与不同的书签相匹配。

:warning: 如果您想在 IndexedDB 为书签创建一条相应记录，请在新增书签时优先使用 TagDown 插件。话虽如此，如果在安装 TagDown 之前，浏览器中已经存在很多书签，或者您顺手[用 Chrome 的默认工具创建书签](https://support.google.com/chrome/answer/188842)也是没问题，因为之后您还可以通过修改书签的方式，手动添加数据到 IndexedDB 数据库中。

## 常见疑问解答

### TagDown 为什么需要使用 IndexedDB 数据库？
虽然书签都保存在浏览器中，但它们只包含 `id`、`title`、`url` 和文件夹信息，TagDown 希望给书签附加更多的信息，如 `tags`、`description` 等，因此使用一个内置在浏览器中的本地数据库来保存这些数据。

### 如果卸载/移除扩展程序会丢失哪一部分数据？

书签保存在浏览器中并由 Google 同步（如果您使用 Chrome 并打开同步选项），**因此如果您卸载扩展程序，请放心，所有书签都不会受影响**。

但是 TagDown 创建并保存在 **IndexedDB 中的相关数据将会丢失**。 您可以在卸载扩展前 :clapper: **[导出](https://www.bilibili.com/video/BV1up4y1s7VP?p=10)** 这些数据，获得的 `json` 文件可以作为备份数据库，下次重新安装扩展时可以导入以恢复 IndexedDB 相关数据。

顺便说一句，JSON 格式的文件是很常见的，您可以使用其他文本编辑器打开它，例如 [Visual Studio Code](https://code.visualstudio.com/)，直接浏览文档内容。

## 如果重新安装扩展程序会丢失哪一部分数据？

当安装解压后的扩展时，Chrome 会给每个扩展分配一个唯一的 ID，而 IndexedDB 遵循[同源策略](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Basic_Terminology)限制，如果Chrome 为 TagDown 分配了另一个 ID，那么在重新安装扩展后，**可能会导致 IndexedDB 数据丢失**。

您可以在卸载扩展之前**导出**这些数据，这个 `json` 文件可以作为一个备份数据库，您可以在下次重新安装扩展时导入它。

## 如何升级 TagDown？
如果从 TagDown v1.0.0 升级到 v2.0.0 可以直接卸载原有旧版本，安装新版本。但是从 v2.0.0 版本开始 TagDown 使用数据库，而重新安装扩展程序可能会导致 IndexedDB 数据丢失，所以之后的升级，您只需要直接**用新版本的文件夹覆盖替换**原来的扩展的文件夹。

## 在浏览器中保存的书签数据与 IndexedDB 中保存的数据的区别
IndexedDB 数据是浏览器书签数据的副本，它在书签上都附加有其他信息。

**但事实上，它并*不是*一个完整拷贝**。

**只有通过 TagDown 创建或修改过的书签，才会在 IndexedDB 中有相应的记录**。因此，导出的 Indexed 数据库所获得的 JSON 文件可能并不包含所有书签。

如果您想得到所有的书签数据，请使用浏览器提供的默认导出功能，您将会得到一个 HTML 文件：

1. 进入书签管理器：`chrome://bookmarks/`
2. 点击页面右上角的汉堡菜单（三个小点）
3. 从下拉菜单中选择 `导出书签`

## 如何为所有标签页批量创建书签？
Chrome 提供了「为所有标签页添加书签」的功能，以批量创建书签，您可以使用快捷键 `Ctrl + Shift + D` 来触发该功能。

强烈推荐使用另一个扩展程序 [OneTab](https://www.one-tab.com/)，它关闭所有标签，并返回一个带有相应链接列表的页面，也可以将该页面开启在线功能，共享给其他人查看。

## Wiki
在 [wiki](https://github.com/Benbinbin/TagDown/wiki/TagDown-%E6%89%A9%E5%B1%95%E7%A8%8B%E5%BA%8F%E5%BC%80%E5%8F%91%E7%AC%94%E8%AE%B0) 或[掘金](https://juejin.cn/column/7018368500662009892)可查看该项目的开发笔记。

## 版本
* [v2.0.0](https://github.com/Benbinbin/TagDown/releases/tag/v2.0.0) 提供两种模式，**树图模式**和**网格模式**，以**浏览器和可视化**层次化的书签数据，您可以在 2.0.0 版本中**添加**新书签和**编辑**现有书签，并添加 `tags` 和 `groups` 等额外信息。 通过附加到书签的 tag 和 group，您可以**以多种方式导出书签**。 所有数据都将保存在本地，您可以随时**导出整个数据库或导入备份以恢复它**，因此请尝试使用该扩展程序和 chrome 作为您的书签管理器。

* [v1.0.0](https://github.com/Benbinbin/BookDown/releases/tag/v1.0.0) 提供两种模式，**浏览和可视化**层次化的书签数据。