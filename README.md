# automated-apkg-creation
Create automated Anki decks (apkg files) from datas in json files!

## Usage:
You will now get a step by step guide on how to use this project in the best way!

## Step 1:
Install nodejs on your computer and set it up correctly. If necessary, run the command "node -v" in the command line to find out if nodejs is installed correctly and which version is installed.

### Link:
[https://nodejs.org/en](https://nodejs.org/en)

### node -v:
Example output:
18.16.0

## Step 2:
If necessary, delete the existing files from the `/apkg` and `/data` folders.

## Step 3:
Add your own json files with data into the `/data` folder. Pay attention to a correct format! The value "tags" is purely optional.

### Format (see `/data/dataFormat.json`):
```json
{
    "cards": [
        {
            "front": "example",
            "back": "example",
            "tags": ["example"]
        }
    ]
}
```

### Example (see `/data/data1.json`):
```json
{
    "cards": [
        {
            "front": "example1",
            "back": "example1",
            "tags": ["example1", "example2", "example3"]
        },
        {
            "front": "example2",
            "back": "example2",
            "tags": ["example1", "example2"]
        },
        {
            "front": "example3",
            "back": "example3",
            "tags": ["example1"]
        },
        {
            "front": "example4",
            "back": "example4"
        },
        {
            "front": "example5",
            "back": "example5"
        },
        {
            "front": "example6",
            "back": "example6",
            "tags": ["example1"]
        },
        {
            "front": "example7",
            "back": "example7",
            "tags": ["example1", "example2"]
        },
        {
            "front": "example8",
            "back": "example8",
            "tags": ["example1", "example2", "example3"]
        }
    ]
}
```

## Step 4:
Edit the data in `/config.json`. Pay attention to a correct format!

### Format (see `/configFormat.json`):
```json
{
    "decks": [
        {
            "dataJson": "example.json",
            "deckName": "example"
        }
    ]
}
```

### Example (see `/config.json`):
```json
{
    "decks": [
        {
            "dataJson": "example1.json",
            "deckName": "example1"
        },
        {
            "dataJson": "example2.json",
            "deckName": "example2"
        },
        {
            "dataJson": "example3.json",
            "deckName": "example3"
        }
    ]
}
```

## Step 5:
Start the program by opening the commandline in this folder (shortcut in Visual Studio Code: Ctrl + J) and execute the command "node .".

### node .
Example output:
example1.apkg was generated!
example2.apkg was generated!
example3.apkg was generated!

## Step 6:
The apkg files were generated after running the script and saved in the folder `/apkg`. Now paste the apkg files into Anki.

# Error messages:
Most of the error messages are created by me and explain how to fix them. If you don't understand a bug, or need help in general using this project, feel free to join my Discord server!

# [https://discord.gg/AcjPRvzPyx](https://discord.gg/AcjPRvzPyx)

# Use ChatGPT:
You can convert your data to json files properly in a time efficient way by using ChatGPT. You can view all ChatGPT prompts in `/chatgpt_prompts`.

## Step 3.1:
You need a well separated data structure. Each for the front and back side of the index cards.

## Step 3.2:
Give ChatGPT an example of what the beginning of the json file should look like.

## Step 3.3:
Create a json file with the data converted by ChatGPT and follow steps 3 to 6.

### Link:
[https://chat.openai.com](https://chat.openai.com)

### Example (see `/chatgpt_prompts/convertDataToCorrectJson.txt`):
You are supposed to convert two data packets into one json data set. Don't give me any code, just the properly converted json file.
The format of the json file:


\#\#\#
```json
{
    "cards": [
        {
            "front": "example",
            "back": "example"
        }
    ]
}
```
\#\#\#

first data packet for the front values of the json file:

\#\#\#

frontCard1

frontCard2

frontCard3

frontCard4

frontCard5

frontCard6

frontCard7

frontCard8

frontCard9

frontCard10

\#\#\#

second data packet for the back values of the json file:

\#\#\#

backCard1

backCard2

backCard3

backCard4

backCard5

backCard6

backCard7

backCard8

backCard9

backCard10

\#\#\#

Example for the beginning of the json file:

\#\#\#
```json
{
    "cards": [
        {
            "front": "frontCard1",
            "back": "backCard1"
        },
        {
            "front": "frontCard2",
            "back": "backCard2"
        },
        ...
    ]
}
```
\#\#\#

### Output (see `/chatgpt_prompts/convertDataToCorrectJsonOutput.txt`):
Here is the properly converted JSON file combining the front and back values:
```json
{
  "cards": [
    {
      "front": "frontCard1",
      "back": "backCard1"
    },
    {
      "front": "frontCard2",
      "back": "backCard2"
    },
    {
      "front": "frontCard3",
      "back": "backCard3"
    },
    {
      "front": "frontCard4",
      "back": "backCard4"
    },
    {
      "front": "frontCard5",
      "back": "backCard5"
    },
    {
      "front": "frontCard6",
      "back": "backCard6"
    },
    {
      "front": "frontCard7",
      "back": "backCard7"
    },
    {
      "front": "frontCard8",
      "back": "backCard8"
    },
    {
      "front": "frontCard9",
      "back": "backCard9"
    },
    {
      "front": "frontCard10",
      "back": "backCard10"
    }
  ]
}
```
Please note that this example includes the first two data packets for demonstration purposes. The remaining cards follow the same pattern with the corresponding front and back values.

*(ChatGPT 3.5, request sent on: 20.05.2023)*