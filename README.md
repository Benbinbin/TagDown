# TagDown

<p align="center">
    <img style="width: 60%; padding:5rem" src="https://user-images.githubusercontent.com/40909550/132101266-ebb79e42-4f1d-45bb-ba61-4013c9fb63ed.png"/>
</p>

<p align="center">An Enhanced Bookmarks Manager Extension</p>

## Introduction

TagDown is an open source browser extension to manage bookmarks, you can *browse*, *add*, *edit* the bookmarks, it also supports for *exporting* bookmarks in different ways.

![UI](https://user-images.githubusercontent.com/40909550/137291507-f04ce62e-82fc-4835-ad9d-7c98aa07cdbd.png)

:link: [中文版本的简介](./README-CN.md)

## Highlight

* Support for :clapper: [adding](https://youtu.be/DvCZSY5Kn0o) `tags`, `groups`, and other additional information to bookmark
* Support for :clapper: [exporting](https://youtu.be/EXnYbXRCnjg) any bookmarks to a `json` file
* Browse bookmarks hierarchical data in :clapper: [tree diagram](https://youtu.be/LydLrF2y73U)
* Open multiple bookmarks in one click, and support for :clapper: [opening bookmarks in group](https://youtu.be/a3ETD0T3wbs)

Data is kept local, additional information enhancement is non-destructive and does not affect browser bookmarks data after uninstalling the extension.

## Install

1. Download the latest version [TagDown](https://github.com/Benbinbin/TagDown/releases) `zip` file and unzip it

2. Follow the [instruction](https://developer.chrome.com/docs/extensions/mv2/getstarted/#:~:text=added%20as%20an%20extension%20in%20developer%20mode%20in%20its%20current%20state) to install the *unpacked* extension:
    * open Chrome and navigate to `chrome://extensions`
    * Enable **Developer Mode** by clicking the toggle switch next to `Developer mode`
    * Click the `LOAD UNPACKED` button and select the unzip directory

3. Then you can use this extension and Chrome as your bookmarks manager. feel free to play around!

:bulb: Watch this :clapper: [video playlist](https://youtube.com/playlist?list=PLqLRbo_6ezAHbvksyksH81TRT_b_ldLHL) for more instructions on how to use it

## Data
TagDown uses Chrome APIs to interact with the bookmarks and tabs, it doesn't depend on any backend server, so **all data store in browser**.

:bulb: If you login the Chrome and [turn sync on](https://support.google.com/chrome/answer/185277), the bookmarks will sync by Google, so you can share bookmarks between different devices with the same account (if you use Microsoft Edge, which is also based on Chromium, the bookmarks will [sync](https://support.microsoft.com/en-us/microsoft-edge/sign-in-to-sync-microsoft-edge-across-devices-e6ffa79b-ed52-aa32-47e2-5d5597fe4674) by Microsoft).

In addition to using the bookmarks by calling the Chrome API, TagDown also save some data in **[IndexedDB](https://developer.mozilla.org/zh-TW/docs/Web/API/IndexedDB_API)**, which is a database provided by browser to persistently store data. When you :clapper: **[add a new bookmarks by TagDown](https://youtu.be/DvCZSY5Kn0o)**, you can provide addition information for the new bookmark, like `tags`, `groups` and `description`, this data will save inside the IndexedDB and they will **not** sync by Google, it always exist locally.

TagDown provides an :clapper: [`export` and `import` feature](https://youtu.be/Iscrkte5JWY), you can export the whole IndexedDB database as a `json` file and save it at you own place as a backup, and restore the database by import the file.

:bulb: Each bookmark will be assigned a unique ID by Chrome, TagDown use this unique ID as the index at IndexedDB to connect different part of the data to different bookmark.

:warning: Please using TagDown all the time when you create a new bookmark, if you want to create a relative record at IndexedDB at the same time. But it will be fine, if there're a lot of bookmarks in the browser before installing TagDown, or [create bookmark with the Chrome default tool](https://support.google.com/chrome/answer/188842). You can open the bookmark at any time and click the edit button on the TagDown, then save the relative data to IndexedDB manually.

## FAQ

### Why the TagDown uses IndexedDB as a database?

Although all bookmarks save inside the browser, they only contain the `id`, `title`, `url` and `folder` information, TagDown wants to attach more information to bookmark, like `tags`, `description` about the bookmark, so TagDown use an local database to save these data.


### If I uninstall the extension which part of the data will lose?

The bookmarks save inside the browser and sync by Google (if you use Chrome and turn sync on), **so all the bookmarks will be fine** if you uninstall the extension.

But the relative data create by TagDown and save in **IndexedDB will be lost**. You can :clapper: **[export](https://youtu.be/Iscrkte5JWY)** these data before uninstall the extension, the `json` file can be a backup database, you can import it if you install the extension again in the next time.

By the way, the JSON format is so popular and you can open it with other text editors, like [Visual Studio Code](https://code.visualstudio.com/), and read or get the information directly.

### If I re-install the extension which part of the data will lose?

When install the unpacked extension, Chrome will assign a unique ID for each extension, and IndexedDB follows a [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Basic_Terminology), which **may cause the IndexedDB data lose** after re-installing the extension if Chrome assign another ID for TagDown.

You can **export** these data before uninstall the extension, the `json` file can be a backup database, you can import it if you install the extension again in the next time.

### How to upgrade TagDown?
If you upgrade TagDown from v1.0.0 to v2.0.0, you can uninstall the old version directly, then install the new version. But TagDown use IndexedDB from v2.0.0, and  re-install the extension may cause IndexedDB data lost, so you only need to **replace the folder** of the extension source code with the new version directly in file system.

### The difference between bookmarks data save in Browser and the IndexedDB.
IndexedDB data is a copy of the browser bookmark data, which has other information attached to each bookmark.

**But in fact, it is *not* a complete copy version.**

**Only bookmarks created or modified through TagDown will have corresponding records in IndexedDB.** Therefore, the exported Indexed database JSON file may not contain all bookmarks.

If you want to get all bookmarks data please use default exporting function provided by browser, you can get a HTML file instead:

1. Go to the bookmark manager: `chrome://bookmarks/`
2. Click the three dots in the upper/right
3. Select `Export Bookmarks` from the drop-down menu

### How to add a bulk bookmarks from multiple tabs at the same time?
Chrome provides a feature to add all tabs as bookmarks into a folder at the same time, you can use the short cut `Ctrl + Shift + D` to trigger this function.

Highly recommended to use another extension [OneTab](https://www.one-tab.com/), which closes all tabs and returns a page with a corresponding list of links, which can also be shared as an online page for others user to view these links.

## Wiki
在 [wiki](https://github.com/Benbinbin/TagDown/wiki/TagDown-%E6%89%A9%E5%B1%95%E7%A8%8B%E5%BA%8F%E5%BC%80%E5%8F%91%E7%AC%94%E8%AE%B0) 或[掘金](https://juejin.cn/column/7018368500662009892)可查看该项目的开发笔记。

## Version
* [v2.0.0](https://github.com/Benbinbin/TagDown/releases/tag/v2.0.0) providing two modes, **tree mode** and **grid mode**, to **browser and visualize** the hierarchy bookmarks data, you can **add** new bookmarks and **edit** the existed bookmarks with some tags and groups in Version 2.0.0. With tags and groups attached to bookmark, you can **export bookmarks in many ways**. All data will be save in local, you can **export the entire database or restore it by importing backup data** at any time, so feel free to use this extension and chrome as your bookmarks manager.

* [v1.0.0](https://github.com/Benbinbin/BookDown/releases/tag/v1.0.0) provide two modes to visualize the hierarchy data, you can **browser and visualize** the hierarchy bookmarks data fast and conveniently.

## Todos
- [x] redesign the [UI](https://www.figma.com/community/file/1014891055524312843) (Figma [prototype](https://www.figma.com/proto/2Rtmm9uWs4LOAqLviyvveX/TagDown?node-id=1447%3A7484&scaling=scale-down&page-id=1403%3A1050&starting-point-node-id=1447%3A7484&show-proto-sidebar=1))
- [x] support for **adding** new bookmark
- [x] support for **editing** existed bookmark
- [x] support for adding **tags** and **groups** to classify the bookmarks
- [x] support for adding **memo/description** to describe bookmark
- [x] ~~override the Bookmark Manager page~~ add **pinning** bookmarks temporarily feature to provide a more convenient way to manipulate bookmarks in batch
- [x] support for backing up and exporting the bookmark
- [ ] support for searching bookmarks based on tags or groups