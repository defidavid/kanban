# Kanban

### Desktop
![image](https://user-images.githubusercontent.com/2999380/166396289-123ff994-609c-4807-b0dc-4e9ce6cbb252.png)


### Responsive
![image](https://user-images.githubusercontent.com/2999380/166390506-b883acf3-0534-4003-a210-fe08c49ab95f.png)


### Run App

```
npm install --global yarn
// Install Git: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
git clone https://github.com/defidavid/kanban.git
cd kanban
yarn
yarn start
```

### Completed Tasks

:white_check_mark: Model: Column (Name, Order)

:white_check_mark: Model: Card (Name, Description, Created date, Status(Open, Closed), Order)

:white_check_mark:  User can add column with name

:white_check_mark: User can modify column name

:white_check_mark: User can delete empty column

:white_check_mark: User can move columns by drag & drop

:white_check_mark: User can add card to column with name and description

:white_check_mark: User can modify card details

:white_check_mark: User can identify / switch status of card

:white_check_mark: User can move / order card by drag & drop

:white_check_mark: User can archive card

:white_check_mark: i18n

:white_check_mark: Persistent storage (localStorage)

:white_check_mark: Responsive web design (small screen sizes)

:white_check_mark: Render instruction when column is empty

:white_check_mark: 404 Page if url is not valid

:white_check_mark: Auto focus on initial state (including modals)

:white_check_mark: Input validation (max length, trim functions, button disabled until form complete)

### Known Issues
* Unable to view/unarchive archived tasks

### Tech Used
* Scaffolding: create-react-app
* Component library: Material-UI
* State management: reducer + context
* DnD: react-dnd
