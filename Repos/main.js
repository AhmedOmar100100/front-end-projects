// setting variables
let searchResults = document.getElementById("searchResults");
let getButton = document.getElementById("getButton");
let searchInp = document.getElementById("searchInp");


// getResults
getButton.onclick = function () {
    if (searchInp.value == "") {
        searchResults.innerHTML = "Type something To search";
        searchInp.focus();
        searchResults.style.textAlign = "center"

    } else {
        searchResults.innerHTML = "";
        let ajax = new XMLHttpRequest();
        ajax.open("GET", `https://api.github.com/users/${searchInp.value}/repos`);
        ajax.send()
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                ReposData = JSON.parse(ajax.response)
                for (let i = 0; i < ReposData.length; i++) {
                    // create main div
                    let mainDiv = document.createElement("div");
                    // create repo name text
                    let repoName = document.createTextNode(ReposData[i].name.slice(0, 20))
                    // append text to main div
                    mainDiv.appendChild(repoName)

                    // create repo url
                    let url = document.createElement("a")

                    // create repo url text
                    let urlText = document.createTextNode("Go")

                    // append url text to tag a
                    url.appendChild(urlText)

                    url.href = `https://www.github.com/${ReposData[i].full_name}`;
                    url.setAttribute("target", "_blank")

                    mainDiv.appendChild(url)

                    // create stars span
                    let starsSpan = document.createElement("span")
                    // create stars count text
                    let starsCountText = document.createTextNode(ReposData[i].stargazers_count)
                    // append
                    starsSpan.appendChild(starsCountText)

                    mainDiv.appendChild(starsSpan)

                    mainDiv.className = "repo-div"






                    // append main div to container
                    searchResults.appendChild(mainDiv)
                    // make text-align left to the container
                    searchResults.style.textAlign = "left"


                }



            }
        }



        searchInp.value = "";
    }
}