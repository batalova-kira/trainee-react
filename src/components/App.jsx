import HomePage from 'pages/HomePage';
import PostDetails from 'pages/PostDetails';
import PostsPage from 'pages/PostsPage';
import { Products } from 'pages/ProductsPage';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';

/*
Етапи роботи з маршрутізацією
 1. Обгорнути весь Аpp в BrowserRouter
 2.Змінити адресний рядок за допомогою компоненти Link або Navlink (пропс to)
 3.Підготувати компонент <Route></Route> для відображення конкретної сторінки за певним шляхом(пропс path)
 4.Якщо нам потрібно зробити шаблонну сторінку для багатьох однотипних даних,
 нам потрібно використовувати дінамичні параметри '/posts/:postId'
 5. Щоб у користувача була змога потрапити на якусь конкретну шаблонну сторінку, ми у компоненті Link  
 вказуємо маршрут наступним чином <Link to={`/posts/${post.id}`}>

 Ремарка!
 Тег <a href="..." target="_blank" rel="noopener noreferrer"></a> використовуємо тільки для зовнішніх посилань типу Instagramm, google, e.t.c.
 <NavLink to="..."></NavLink> або <Link to="..."></Link> використовують тільки для внутрішній навігації 
*/
export const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/posts/:postId/*" element={<PostDetails />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Layout>
  );
};
