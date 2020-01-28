/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

const cardInsert = document.querySelector('.cards')

axios.get('https://api.github.com/users/askaborg')      
  .then(responseAskaborg => {
    console.log('myCard',responseAskaborg)
    
    cardInsert.appendChild(createCard(responseAskaborg.data))
  })

  .catch(errorAskaborg => {
    console.log('askaborg' + errorAskaborg)
  })

axios.get('https://api.github.com/users/bigknell/followers')
  .then(responseFollowers => {
    console.log('followers',responseFollowers)
    responseFollowers.data.forEach(async (githubUser) => {
      const followerUrl = await axios.get(githubUser.url)
      cardInsert.appendChild(createCard(followerUrl.data))
    })
  })

  .catch(errorFollowers => {
    console.log('followers' + errorFollowers)
  })

function createCard(cardData) {
  const cardDiv = document.createElement('div')
  const cardImg = document.createElement('img')
  cardImg.src = cardData.avatar_url
  const cardDiv2 = document.createElement('div')
  const cardH3Name = document.createElement('h3')
  cardH3Name.textContent = cardData.name
  const cardPUsername = document.createElement("p")
  cardPUsername.textContent = cardData.login
  const cardP2Location = document.createElement('p')
  cardP2Location.textContent = "Location:  " + cardData.location
  const cardP3Profile = document.createElement('p')
  cardP3Profile.textContent = "Profile: "
  const cardAProfileURL = document.createElement('a')
  cardAProfileURL.textContent = cardData.html_url
  const cardP4Followers = document.createElement('p')
  cardP4Followers.textContent = "Followers: " + cardData.followers
  const cardP5Following = document.createElement('p')
  cardP5Following.textContent = "Following: " + cardData.following
  const cardBio = document.createElement('p')
  cardBio.textContent = "Bio " + cardData.bio

  cardDiv.classList.add("card")
  cardDiv2.classList.add("card-info")
  cardH3Name.classList.add('name')
  cardPUsername.classList.add('username')

  cardDiv.appendChild(cardImg)
  cardDiv.appendChild(cardDiv2)
  cardDiv2.appendChild(cardH3Name)
  cardDiv2.appendChild(cardP2Location)
    
  cardDiv2.appendChild(cardP3Profile)
  cardP3Profile.appendChild(cardAProfileURL)
  cardDiv2.appendChild(cardP4Followers)
  cardDiv2.appendChild(cardP5Following)
  cardDiv2.appendChild(cardBio)

  return cardDiv
}







