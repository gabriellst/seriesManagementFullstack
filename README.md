# Series Management - v1.0

## **Description**

Series management is a ReactJS and ExpressJS fullstack web app made for a friend, so it's a private application with just one user.

## **Nice Features**
- JWT authentication made from scratch.
- Login persistance using refresh tokens.
- Protected routing.

## **Stack**
- Typescript
- React
- Express
- Axios
- Prisma
### Back-end is being hosted on **Heroku** while the front-end on **Vercel**.

* [<ins>**API**</ins>](http://series-management-api.herokuapp.com/)
- [<ins>**Web App**</ins>](https://series-management.vercel.app/)

## **Backstory**

A friend of mine asked if i could build a interface so he could interact with a database.

He's hosting a postgres database that stores all tv shows he's watching or already watched.

This app works like a crud linked to this database.

### **It was a great opportunity to practice my software developing skills, front-end and backend.**

## **Simple Showcase**

<div style="display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: 1fr; grid-gap: 20px;">
    <img src="https://gabrielaraujo.xyz/github/seriesmanagement/login.gif" >
    <img src="https://gabrielaraujo.xyz/github/seriesmanagement/add.gif" >
    <img src="https://gabrielaraujo.xyz/github/seriesmanagement/listagem.gif">
</div>

## **Future Plans and Improvement**

> - **Containerize** front-end and backend. I've already done this with the backend though, but i'm looking for a place to host it.
> - Test it out on **Kubernetes**, GKE or Minikube.
> - Try other backend solutions like **FastAPI** with python.
> - Implement loading spinners and confirmation.
> - Improve desktop experience.
> - Build future apps using **NextJs**.
> - Try **OAuth** and **Auth0**.