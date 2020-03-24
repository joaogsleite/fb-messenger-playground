
# Facebook Messenger BOT

1. Create FB App:

```
https://developers.facebook.com/apps
```

2. Get **App ID** and **App Secret** from `Settings -> Basic`

3. Copy `.env.example` to `.env`

4. Fulfill `.env` with **App ID** and **App Secret** from step 2

5. Create Facebook Page and fulfill `.env` with `PAGE_ID=...`

6. Create a random string for `VERIFY_TOKEN=...`

5. `npm install`

6. `npm run tunnel`

7. Copy server link to `.env`

7. `npm run start`

8. Place **server link** and **VERIFY_TOKEN** in `Facebook App Settings -> Messenger -> Settings -> Webhook`

9. Use messenger chat!