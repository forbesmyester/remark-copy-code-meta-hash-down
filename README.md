# remark-copy-code-meta-hash-up

**remark-copy-code-meta-hash-up** will, for a [Code Block](https://github.com/syntax-tree/mdast#code) with a separator (default #), copy that code block up with the fence lang and meta set to what is after the separator.

## This means the following code:

    ```bash a # bash b
    Hello ${NAME}
    ```

wll become

    ```bash b
    Hello ${NAME}
    ```

    ```bash a
    Hello ${NAME}
    ```

This is not immediately useful but the idea is to use it with [remark-unixpipe](https://github.com/forbesmyester/remark-unixpipe) to generate input and result similar to [Jupyter](https://jupyter.org/) you see / use on notebooks.

Created by @forbesmyester
License MIT
