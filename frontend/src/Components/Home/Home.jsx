import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {

    const [blogs, setBlogs] = useState([]);
    const [tags, setTags] = useState([]);
    const [cmnt, setCmnt] = useState([])


    useEffect(() => {
        axios.get('http://localhost:8000/getblogs.php')
            .then(response => {
                setBlogs(response.data);
            })
            .catch(error => {
                console.error("Error fetching messages:", error);
            });
    }, []);



    useEffect(() => {
        axios.get('http://localhost:8000/comments.php')
            .then(response => {
                setCmnt(response.data);
            })
            .catch(error => {
                console.error("Error fetching messages:", error);
            });
    }, []);


    useEffect(() => {
        axios.get('http://localhost:8000/tags.php')
            .then(response => {
                setTags(response.data);
            })
            .catch(error => {
                console.error("Error fetching messages:", error);
            });
    }, []);

    return (
        <div className="w-full flex">
            <div className="p-2 w-5/6">
                <h1 className="font-bold text-center">Blogs</h1>
                {
                    blogs.map(b => {
                        return (
                            <div key={b?.blog_id} className="flex flex-col">
                                <div className="card bg-base-100 my-2 shadow-xl border-b-2 border-b-white border-l-2 border-l-white">
                                    <div className="card-body">
                                        <h2 className="card-title">{b.title}</h2>
                                        <p>{b.content}</p>
                                        <i>- {b.author}</i>
                                        <div className="card-actions justify-end">
                                            {
                                                cmnt.map(c => {
                                                    return (
                                                        <div>
                                                            {
                                                                c.blog_id == b.blog_id
                                                                    ?
                                                                    <div key={c.comment_id}>
                                                                        <div className="chat chat-start">
                                                                            <div className="chat-bubble">
                                                                                {c.comment_text}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    :
                                                                    ""
                                                            }
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="w-1/6 p-2">
                <h1 className="font-bold text-center">Popular Tags</h1>
                {
                    tags.map(t => {
                        return (
                            <div className="my-2" key={t.tag_id}>
                                <div className="w-full rounded-lg border border-white p-5 ">
                                    {t.name}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Home;