
let xhttp = new XMLHttpRequest();
xhttp.addEventListener("load", success);
xhttp.addEventListener("error", error);
xhttp.open("GET", "/booksOut", true);
xhttp.send();




function success(){

    let data = JSON.parse(xhttp.response);

    let rows = data.map((row)=>
    < tr key={JSON.stringify(row)}>

        <td> {row.author}</td>
        <td>{row.title}</td>
        <td>{row.published}</td>
        <td>{row.pages}</td>
        <td>{row.language}</td>
    </tr>
    );

    console.log(rows);

    let element = (

        <div>
            <h2>Book Database</h2>
            <table id ="myTable">
                <thead>

                    <tr><th>author</th><th>title</th><th>Published</th><th>Pages</th><th>Language</th>

                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    );

    ReactDOM.render(

        element,
        document.getElementById('books')
    );

    const dataTable = new simpleDatatables.DataTable("#myTable");
}

function error(){

    console.log(xhttp.readyState);
    console.log(xhttp.status);
}