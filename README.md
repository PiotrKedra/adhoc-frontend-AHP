# Decsion making app based on AHP

It is simple mobile app, where you can define decision problem and solve it with AHP (Analytic Hierarchy Process).
From this repo you can get frontend clinet written in react native and expo. Backend server is written in spring boot and you can find it [here](https://github.com/PiotrKedra/adhoc-backend).
To mention this project was created as my engineering thesis.

# How to run
 
First you have to run [backend server](https://github.com/PiotrKedra/adhoc-backend). You have to configure database source (I used PostgreSQL) located at backend project: 
```bash
src/main/resources/application.properties
```
After you have your backend and DB running, you can launch frontend.

<br/>

Project is using [expo](https://expo.io/) and [npm](https://nodejs.org/en/download/), so to run it on your mobile you need to install expo app ([android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US)or [iOS](https://apps.apple.com/us/app/expo-client/id982107779)). 
In: 
```bash
config/ServerConfig.js
```
you have to put path to your server.
Then you can run the app using the command (you have to be in the main directory of the project):
```bash
npm start
```
You also might need to install package that I used. You do it using this command:
```bash
npm install --save [package name]
```

To run app on your device you have to scan the QR code with expo app which will appear after starting the project.

# About the app

To use the app, first you have to register as a new user and then login with your credential. 
In the main menu you can define new problem, see history of your problems and take part in the decision problem that other users shared to you.

<p align="center">
  <img src="/images/welcomeScreen.jpg" height="500"/>
  <img src="/images/homeScreen.jpg" height="500" />
</p>

When you want to create new problem first you have to define objectives, then criteria. After the definition you will have to go through the pairwise comparison. In the end you can choose either to immediately go to the result or you can share the problem with other users, giving their emails. If you do so, you can check your ranking by going to 'Your problems'. You will see current ranking and information about other user. If other user provides the data the ranking will update.

<div>
   <img src="/images/celeScreen.jpg" height="500"/>
   <img src="/images/k-cena1.jpg" height="500"/>
   <img src="/images/mar2.jpg" height="500"/>
</div>
