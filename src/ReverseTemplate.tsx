import { Link, Outlet, ScrollRestoration } from "react-router-dom"

export const ReverseTemplate = () => {
    return (<div className="reverse-background">
            <h1 style={{
                  textAlign: "center",
                  fontSize: "xx-large",
              }}>
                <Link to="/reverse">裏牛耕式小説の勧め</Link>
            </h1>
        <Outlet />
        <ul>
            <li><Link to="/reverse/example">例</Link></li>
            <li><Link to="/reverse/post">投稿</Link></li>
            <li><Link to="/">表サイトへの出口。</Link></li>
        </ul>
        <ScrollRestoration />
    </div>)
}
