## SquareSpace x Zapier Workaround
This script creates a pre-formated gmail draft so you dont have to pay for Zapier.

#### by Gates Kennedy (2024)

#### www.GatesKennedy.com

##### INSTRUCTIONS

1. From SquareSpace Admin controls

    - Go to 'Website' Editing UI (Where you change stuff like content)
    - Navigate to 'Contact Form'
    - Edit Contact form (click 'pencil icon' on hover)
    - Click 'Storage'
        - -> 'Additional Storage'
        - -> 'Google Drive (Sheets)'
        - Enter Google Drive Credentials
            - Accept Permissions
        - Name Spreadsheet
            - -> 'Back'
        - Accept All Permissions

2. From Google Drive (The account you just linked to SquareSpace)

    - Open the 'Spreadsheet' created by SquareSpace
    - Click 'Extensions' from top menu bar
        - -> Apps Script
            - -> Copy 'main.gs' into <> Code window
            - -> Save and Run
            - Add 'Services' from side menu with '+' icon
                - -> 'Gmail API'
                - -> Confirm permissions
    - Hover on 'GK Auto Mailer'
        - -> 'Enable... ' from drop down menu

##### DONE

-   Any new row will trigger an email draft containing the contents of that row.
-   Test form submission or trigger draft creation by copying down new rows.
-   Troubleshoot by examining the 'Executions' log from the side menu.

##### CONTACT G_K

-   www.GatesKennedy.com
-   Conor@GatesKennedy.com
