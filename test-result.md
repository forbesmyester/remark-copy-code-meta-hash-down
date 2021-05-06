# Heading

```shell
echo "Hello $NAME"
```

```unixpipe env NAME="World!" envsubst | wrap-as-lang shell
echo "Hello $NAME"
```
