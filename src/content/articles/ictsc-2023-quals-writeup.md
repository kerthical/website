---
title: ICTSC 2023 予選 Writeup
createdAt: 2023/12/18
---

# ICTSC 2023 予選 Writeup

細かいファイル名とかは今問題が見れないので間違ってるかもしれないです。記憶から思い起こして書いたwriteupです。

## [実技問題] jenkinsにアクセスできない

そもそもアクセスできないので、`kubectl get pods` を見てみると `jenkins` のpodがクラッシュループに入ってることがわかる。control
planeのkubernetes構成ファイルを見ると、JAVA_OPTSのメモリ割り当てが `-Xms4096m`
になっていることがわかる。ただ、各ノードのメモリにはそれ以下（確か1Gか512m）しか割り当てられていないので、podが起動できない。`-Xms512m`
に変更してやれば良い。あとは `kubectl apply -f /home/user/jenkins.yaml` で適用。

```bash
$ sed -i 's/-Xms4096m/-Xms512m/g' /home/user/jenkins.yaml
$ kubectl apply -f /home/user/jenkins.yaml
```

## [実技問題] 絵文字が書き込めない！

「redmineの絵文字に🍣の絵文字を書き込むとエラーが出る」という問題。 redmineのサーバー設定、及びSQLの設定から、`utf8`
が使われていることがわかるので、`utf8`の文字列が入ってそうなファイル全部を `utf8mb4` に変換してやれば良い。
あとは `docker-compose up -d --force-recreate` でコンテナ再起動でOK。

```bash
$ find /opt/redmine -type f -exec sed -i 's/utf8/utf8mb4/g' {} \;
```

## [実技問題] ファイルがアップロードできない

「goで書かれたファイルアップロードサーバーにファイルをアップロードしようとするとエラーが出る」という問題。容量が足りないというエラーが出ていたので
`df -h` で確認すると、 容量は十分であることがわかる。ただし、inode数が枯渇していることがわかるので、/home/user/storageのバックアップをtarで
取って、inode数を増やしてフォーマットし直す。あとはtarを展開してやればOK。フォーマットは再起動後も永続化されるので、これで大丈夫。

```bash
$ sudo tar -cvpzf backup.tar.gz /home/user/storage
$ sudo umount /home/user/storage
$ sudo mkfs.ext4 -T largefile -m 0  -N 1000000 /dev/vdb1`
$ sudo mount /dev/vdb1 /home/user/storage
$ sudo tar -xvpzf backup.tar.gz -C /home/user/storage
$ sudo chmod -R 777 /home/user/storage
$ sudo reboot
```