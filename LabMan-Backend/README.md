# LabMan

## Getting Started

### Dependencies
- node ver ^16
- express ver ^4.18.2
- express-async-error ver ^3.1.1
- dotenv ver ^16.0.3

### Dev Dependencies
- nodemon ver ^2.0.20
- eslint ver ^8.35.0

### Installing
- Install all needed Dependencies
```
npm ci
```

### Executing program
- Run the Project
```
npm run start
```
- DEV modal
```
npm run dev
```
- Stop running
```
^c
```
```
control + c
```

## .env Variables
Create a file named .env under project root and paste the following in it
```
PORT = 3008
```

## Error Handling

Status Code:

- 400(Bad Request): The request could not be understood or was missing required parameters
- 401(Unauthorized): Authentication failed or user does not have permissions for the requested operation
- 403(Forbidden): Access denied
- 404(Not Found): Resource was not found
- 405(Method Not Allowed): Requested method is not supported for the specified resource
- 409(Conflict): Request could not be completed due to a conflict with the current state of the resource
- 500(Internal Server Error): An error occurred on the server side while processing the request.

## Version History

- 1.0 Initial functions



## License

This project is licensed under the ISC License - see the LICENSE.md file for details

## Author

- Chang Liu
- Wanxia Yang
- Shuxiao Peng
- Kaini Chang  (completed)