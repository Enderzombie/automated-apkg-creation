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
            "dataJson": "data1.json",
            "deckName": "example1"
        },
        {
            "dataJson": "data2.json",
            "deckName": "example2"
        },
        {
            "dataJson": "data3.json",
            "deckName": "example3"
        }
    ]
}
```

# Step 5:
Start the program by opening the commandline in this folder (shortcut in Visual Studio Code: Ctrl + J) and execute the command "node .".

### node .
Example output:
example1.apkg was generated!
example2.apkg was generated!
example3.apkg was generated!

# Step 6:
The apkg files were generated after running the script and saved in the folder `/apkg`. Now paste the apkg files into Anki.

# Error messages:
Most of the error messages are created by me and explain how to fix them. If you don't understand a bug, or need help in general using this project, feel free to join my Discord server!

# [https://discord.gg/AcjPRvzPyx](https://discord.gg/AcjPRvzPyx)