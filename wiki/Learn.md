# 1. What is the Visual Crossing API & How do I get a key?

## What is it?

When you want real-time data (like current weather, sports scores, or stock prices),
your server needs to ask another company that specializes in collecting that data.

**Visual Crossing** is simply a company that collects weather data globally.

They provide an **API** (Application Programming Interface),
which is just a specific URL that our code can hit to fetch that data.

### How to get your FREE API Key

1. Go to the [Visual Crossing Weather Data Website](https://www.visualcrossing.com/).
2. Click on the **Sign Up** or **Get Free API Key** button.
3. Create a free account (it takes 1 minute).
4. Once logged in, you will be taken to a dashboard.
5. You will see a long string of letters and numbers labeled **API Key** (e.g., `ABC123XYZ...`).
6. Copy that key and paste it into your `.env` file like this:

   ```env
   WEATHER_API_KEY=ABC123XYZ...
   ```

   _The free tier gives you 1,000 requests per day, which is more than enough for testing._

---

## 2. What is Redis & Why are we using it?

### What is it?

Imagine you have 10,000 users asking for the weather in London. If your server calls the Visual Crossing API 10,000 times:

1. You will quickly exceed your 1,000 free requests.
2. It's slow, because your code has to wait for Visual Crossing's servers every single time.

**Redis** is an ultra-fast, in-memory **cache** database. It acts like sticky notes for your server.

### How it works in our project

- **The First Request:** A user asks for London's weather.
  1. Your server asks Redis: _"Do you have London's weather?"_
  2. Redis says: _"No, I'm empty."_ (Cache Miss ❌)
  3. Your server calls the Visual Crossing API, gets the weather, and returns it to the user.
  4. Your server then tells Redis: _"Hey, save this London weather for 12 hours!"_

- **The Second Request:** A minute later, another user asks for London.
  1. Your server asks Redis: _"Do you have London's weather?"_
  2. Redis says: _"Yes! Here it is."_ (Cache Hit 🎯)
  3. Your server returns the data **instantly** without using up your Visual Crossing API credits.

### How to install Redis on your Arch machine

Since you are on Arch Linux, setting up Redis is just a couple of terminal commands.

Open a terminal and run:

```bash
# 1. Install Redis
sudo pacman -S redis

# 2. Start the Redis service immediately
sudo systemctl start redis

# 3. Enable it to start automatically when your computer boots up
sudo systemctl enable redis
```

Once running, your Redis is active locally on `redis://localhost:6379`, which matches our `.env.example` file!

---

Now that you know what these do, you can sign up for the API key and start your Redis service. Let me know when you have your key in the `.env` file and are ready to proceed.
