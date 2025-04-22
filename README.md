# Heaxdecilab

### Useful Commands
```sh
find . | grep "\.png$" | sed "s/\.png$//" | xargs -I{} sh -c 'cwebp "$1.png" -o "$1.webp" && rm "$1.png"' _ {}
```

### License

- [MIT](LICENSE)
