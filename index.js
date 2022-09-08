const database = {
    users:[{
        id: "user-1",
        name:"Jon Snow",
        articles:["article-1","article-2"]
    },{
        id:"user-2",
        name:"Arya Stark",
        articles:["article-3"]
    }],
    articles:[{
        id:"article-1",
        author:"user-1",
        name:"So your brother is king",
        content:"No big deal! So what if your brother is the king of the realm?"
    },{
        id:"article-2",
        author:"user-1",
        name:"Looking great in black",
        content:"One way to look your best that people often overlook is accessorising your cloak with raven's and crow's feathers..."
    },{
        id:"article-3",
        author:"user-2",
        name: "What to do when people underestimate you",
        content: "As they say, good things come in small packages..."
    }]

};


let [route, detail] = window.location.href.split('/').slice(-2);

switch (route) {
    case "user":
        const userDetail = database.users.find(({id})=>id === detail);
        render(
            `
                ${userDetail ? 
                    `<h3>
                        Articles by ${userDetail.name}
                    </h3>
                ${userDetail.articles
                    .map(articleId => database.articles.find(({id})=>id === articleId))
                    .map(article=>`
                        <div>
                            <a href="/article/${article.id}">${article.name}</a>
                        </div>
                    `).join('')}
`
                : 
                `<div>No matching user was found with id ${detail}</div>`} 
            `
        );
        break;
    case "article":
        const articleDetail = database.articles.find(({id})=>id === detail);
        const authorDetail = database.users.find(({id})=> id === articleDetail.author);
        console.log(articleDetail);
        render(
            `
                ${articleDetail ? 
                `
                    <h3>
                        ${articleDetail.name}
                    </h3>
                    <h4>
                        <a href="/user/${authorDetail.id}">
                            By ${authorDetail.name}
                        </a>
                    </h4>
                    <p class="card">
                        ${articleDetail.content}                        
                    </p>
                `
                :
                `
                    <div>No such article was found</div>
                `}
            `
        );
        break;
    default:
        render(
            `<h3>All Authors</h3>`,
            database.users.map(user=>(
                `<h3><a href="/user/${user.id}">${user.name}</a></h3>`
            )).join('')
        );
}

function render(...html) {
    document.getElementById("Container").innerHTML = html.join('');
}