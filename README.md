##### simple package for querying `wit.ai` servers directly form your terminal.

You should have already created and configured your bot, in order to use this package.

**usage:**

1. run `npm install -g witai-query`

2. then set your own access token, `witai --set-access-token 6FEC5OHSLKQSOLQEPOIPRTLRFAUAENHR`

3. then `witai -q "create new purchase order"`

**response,**
```   
    messageId  0PG1KhN0IHv2ekdrN
    textUsed  create new purchase order

    Entities:
    intent           {"confidence":0.99775397707497,"value":"new_order"}
    client_location  {"suggested":true,"confidence":0.49334199675743,"value":"order","type":"value"}
```
