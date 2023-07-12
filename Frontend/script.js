const url = 'http://localhost:3000/getWeather'
document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('button');
    const input = document.getElementById('input')
    const output = document.getElementById('output')
    const message = document.getElementById('message')

    button.addEventListener('click', async function() {
      // Function to be executed when the button is clicked
      console.log('Button clicked!');
      output.innerHTML=''
      const cities = input.value.split(',')
      const data = {"cities":cities}
      // Call your desired function here
      message.innerHTML="Loading..."
      let xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText);
            console.log(responseData)  
            const ul = document.createElement("ul");
            for (let element in responseData) {
                console.log(element)
                const li = document.createElement("li");
                const textnode = document.createTextNode(`${element}: ${responseData[element]}`);
                li.appendChild(textnode);                
                ul.appendChild(li);
              }
            message.innerHTML = "Done"
            output.appendChild(ul);
            // output.innerHTML="bye"
            console.log('done')
        }
        };
        xhr.send(JSON.stringify(data));
    });
  
    
  });