import { useMemo, useState } from 'react'

const initialUsers = [
  {
    id: 1,
    name: 'Airi',
    age: 28,
    area: 'Tokyo',
    hobby: 'Cafe hopping',
    message: '休日はカフェや散歩を楽しみます。落ち着いて話せる人が好きです。',
  },
  {
    id: 2,
    name: 'Ryo',
    age: 31,
    area: 'Kanagawa',
    hobby: 'Movies',
    message: '映画とラーメン巡りが好きです。まずは気軽に話せたらうれしいです。',
  },
  {
    id: 3,
    name: 'Mina',
    age: 27,
    area: 'Saitama',
    hobby: 'Travel',
    message: '旅行やおいしいご飯が好きです。一緒に楽しめる相手を探しています。',
  },
]

export default function App() {
  const [users, setUsers] = useState(initialUsers)
  const [likedIds, setLikedIds] = useState([])
  const [matchedIds, setMatchedIds] = useState([])

  const stats = useMemo(() => {
    return {
      total: users.length,
      liked: likedIds.length,
      matched: matchedIds.length,
    }
  }, [users.length, likedIds.length, matchedIds.length])

  const handleLike = (id) => {
    if (likedIds.includes(id)) return

    setLikedIds((prev) => [...prev, id])

    if (id % 2 === 1) {
      setMatchedIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
    }
  }

  const handleSkip = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id))
    setLikedIds((prev) => prev.filter((likedId) => likedId !== id))
    setMatchedIds((prev) => prev.filter((matchedId) => matchedId !== id))
  }

  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">React + Vite Sample</p>
        <h1>マッチングアプリの最小サンプル</h1>
        <p className="lead">
          とりあえず動く見本として、プロフィール表示・いいね・簡易マッチ表示だけ入れています。
        </p>
      </header>

      <section className="stats">
        <div className="statCard">
          <span>表示中</span>
          <strong>{stats.total}</strong>
        </div>
        <div className="statCard">
          <span>いいね</span>
          <strong>{stats.liked}</strong>
        </div>
        <div className="statCard">
          <span>マッチ</span>
          <strong>{stats.matched}</strong>
        </div>
      </section>

      {matchedIds.length > 0 && (
        <section className="matchBox">
          <h2>マッチした相手</h2>
          <ul>
            {users
              .filter((user) => matchedIds.includes(user.id))
              .map((user) => (
                <li key={user.id}>{user.name} さんとマッチしました</li>
              ))}
          </ul>
        </section>
      )}

      <section className="cardGrid">
        {users.map((user) => {
          const isLiked = likedIds.includes(user.id)
          const isMatched = matchedIds.includes(user.id)

          return (
            <article className="card" key={user.id}>
              <div className="cardHeader">
                <div>
                  <h2>
                    {user.name} <span>{user.age}</span>
                  </h2>
                  <p>
                    {user.area} / {user.hobby}
                  </p>
                </div>
                {isMatched && <span className="badge">MATCH</span>}
              </div>

              <p className="message">{user.message}</p>

              <div className="actions">
                <button className="skipButton" onClick={() => handleSkip(user.id)}>
                  スキップ
                </button>
                <button className="likeButton" onClick={() => handleLike(user.id)} disabled={isLiked}>
                  {isLiked ? 'いいね済み' : 'いいね'}
                </button>
              </div>
            </article>
          )
        })}
      </section>
    </div>
  )
}
