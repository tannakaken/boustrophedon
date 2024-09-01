import { Link, Outlet, ScrollRestoration } from "react-router-dom"

export const MainTemplate = () => {
    return (<div className="background">
        <h1 style={{
              textAlign: "center",
            fontSize: "xx-large",
              }}>
            <Link to="/">牛耕式小説の勧め</Link>
        </h1>
        <Outlet />
        <ul>
            <li><Link to="/example">例</Link></li>
            <li><Link to="/post">投稿</Link></li>
            <li>裏サイトの入り口は秘密です<Link to="/reverse">。</Link></li>
        </ul>
        <ScrollRestoration />
    </div>)
}
