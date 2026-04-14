import { useMemo, useState } from 'react'

const profiles = [
  {
    id: 1,
    name: 'Airi',
    age: 28,
    area: 'Tokyo',
    occupation: 'Web Designer',
    catchCopy: '落ち着いたカフェ時間が好きです',
    bio: '休日はカフェ巡りや散歩をして過ごすことが多いです。会話のテンポが合う人と、ゆっくり仲良くなれたらうれしいです。',
    tags: ['カフェ', '散歩', 'デザイン'],
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
    likedMe: true,
  },
  {
    id: 2,
    name: 'Ryo',
    age: 31,
    area: 'Kanagawa',
    occupation: 'Sales',
    catchCopy: '映画とラーメン巡りが好きです',
    bio: '仕事終わりに映画を見たり、休日に気になるお店を開拓したりしています。まずは気軽に話せる関係から始めたいです。',
    tags: ['映画', 'ラーメン', 'ドライブ'],
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
    likedMe: false,
  },
  {
    id: 3,
    name: 'Mina',
    age: 27,
    area: 'Saitama',
    occupation: 'Nurse',
    catchCopy: '旅行とおいしいご飯が好きです',
    bio: '小旅行が好きで、次の休みにどこへ行くか考えるのが楽しみです。一緒にいろいろな場所へ行ける人がいたらうれしいです。',
    tags: ['旅行', 'ご飯', '写真'],
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
    likedMe: true,
  },
  {
    id: 4,
    name: 'Kenta',
    age: 29,
    area: 'Chiba',
    occupation: 'Engineer',
    catchCopy: 'インドアもアウトドアも両方好きです',
    bio: 'ゲームやアニメも好きですが、天気がよければ外に出かけたいタイプです。無理せず自然体で話せる相手を探しています。',
    tags: ['ゲーム', 'アニメ', 'キャンプ'],
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80',
    likedMe: false,
  },
]

const initialChats = {
  1: [
    { from: 'them', text: 'はじめまして。カフェ巡りが好きなんですね！' },
    { from: 'me', text: 'はじめまして。落ち着いたお店を探すのが好きです。' },
  ],
  3: [
    { from: 'them', text: '旅行好きなんですね。最近どこか行きましたか？' },
    { from: 'me', text: 'この前は箱根に行きました。温泉がよかったです。' },
  ],
}

const areas = ['All', 'Tokyo', 'Kanagawa', 'Saitama', 'Chiba']
const hobbies = ['All', 'カフェ', '旅行', '映画', 'ゲーム']

export default function App() {
  const [selectedArea, setSelectedArea] = useState('All')
  const [selectedHobby, setSelectedHobby] = useState('All')
  const [searchText, setSearchText] = useState('')
  const [likedIds, setLikedIds] = useState([])
  const [matchedIds, setMatchedIds] = useState([])
  const [detailProfile, setDetailProfile] = useState(null)
  const [activeChatId, setActiveChatId] = useState(1)
  const [chatInput, setChatInput] = useState('')
  const [chats, setChats] = useState(initialChats)

  const filteredProfiles = useMemo(() => {
    return profiles.filter((profile) => {
      const areaMatch = selectedArea === 'All' || profile.area === selectedArea
      const hobbyMatch =
        selectedHobby === 'All' || profile.tags.includes(selectedHobby)
      const text = `${profile.name} ${profile.catchCopy} ${profile.bio} ${profile.tags.join(' ')}`.toLowerCase()
      const keywordMatch = text.includes(searchText.toLowerCase())
      return areaMatch && hobbyMatch && keywordMatch
    })
  }, [selectedArea, selectedHobby, searchText])

  const matchedProfiles = profiles.filter((profile) => matchedIds.includes(profile.id))
  const activeChatProfile = profiles.find((profile) => profile.id === activeChatId)
  const activeMessages = chats[activeChatId] ?? []

  const stats = {
    total: filteredProfiles.length,
    likes: likedIds.length,
    matches: matchedIds.length,
  }

  const handleLike = (profile) => {
    if (likedIds.includes(profile.id)) return

    setLikedIds((prev) => [...prev, profile.id])

    if (profile.likedMe) {
      setMatchedIds((prev) => (prev.includes(profile.id) ? prev : [...prev, profile.id]))
      setActiveChatId(profile.id)
      setChats((prev) => ({
        ...prev,
        [profile.id]: prev[profile.id] ?? [
          { from: 'them', text: 'マッチありがとうございます。よろしくお願いします。' },
        ],
      }))
    }
  }

  const handleSend = () => {
    if (!chatInput.trim() || !activeChatId) return

    setChats((prev) => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] ?? []), { from: 'me', text: chatInput.trim() }],
    }))
    setChatInput('')
  }

  return (
    <div className="appShell">
      <section className="topHero">
        <div className="heroText">
          <p className="heroEyebrow">SPmain Matching Demo</p>
          <h1>会いやすさ重視のマッチングアプリ風サンプル</h1>
          <p>
            トップ画面、検索フィルタ、プロフィール詳細、マッチ後のダミーチャットまで入れた見本です。
          </p>
          <div className="heroActions">
            <button className="primaryButton">はじめる</button>
            <button className="ghostButton">おすすめを見る</button>
          </div>
        </div>
        <div className="heroPanel">
          <div className="heroStat"><span>表示中</span><strong>{stats.total}</strong></div>
          <div className="heroStat"><span>いいね</span><strong>{stats.likes}</strong></div>
          <div className="heroStat"><span>マッチ</span><strong>{stats.matches}</strong></div>
        </div>
      </section>

      <section className="filterBar">
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="名前・趣味・自己紹介で検索"
        />
        <select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)}>
          {areas.map((area) => <option key={area}>{area}</option>)}
        </select>
        <select value={selectedHobby} onChange={(e) => setSelectedHobby(e.target.value)}>
          {hobbies.map((hobby) => <option key={hobby}>{hobby}</option>)}
        </select>
      </section>

      <section className="contentGrid">
        <div>
          <h2 className="sectionTitle">おすすめ会員</h2>
          <div className="cardGrid">
            {filteredProfiles.map((profile) => {
              const isLiked = likedIds.includes(profile.id)
              const isMatched = matchedIds.includes(profile.id)

              return (
                <article className="profileCard" key={profile.id}>
                  <div
                    className="cardImage"
                    style={{ backgroundImage: `url(${profile.image})` }}
                  >
                    {isMatched && <span className="matchBadge">MATCH</span>}
                  </div>
                  <div className="cardBody">
                    <div className="cardHeader">
                      <div>
                        <h3>{profile.name} <span>{profile.age}</span></h3>
                        <p>{profile.area} / {profile.occupation}</p>
                      </div>
                    </div>
                    <p className="catchCopy">{profile.catchCopy}</p>
                    <div className="tagList">
                      {profile.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                    <p className="bioPreview">{profile.bio}</p>
                    <div className="cardActions">
                      <button className="ghostButton" onClick={() => setDetailProfile(profile)}>詳細</button>
                      <button className="primaryButton" onClick={() => handleLike(profile)} disabled={isLiked}>
                        {isLiked ? 'いいね済み' : 'いいね'}
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        <aside className="chatLayout">
          <h2 className="sectionTitle">ダミーチャット</h2>
          <div className="chatCard">
            <div className="chatSidebar">
              {matchedProfiles.length === 0 && <p className="emptyText">マッチするとここに表示されます。</p>}
              {matchedProfiles.map((profile) => (
                <button
                  key={profile.id}
                  className={`chatUser ${activeChatId === profile.id ? 'active' : ''}`}
                  onClick={() => setActiveChatId(profile.id)}
                >
                  <strong>{profile.name}</strong>
                  <span>{profile.area}</span>
                </button>
              ))}
            </div>
            <div className="chatMain">
              {activeChatProfile ? (
                <>
                  <div className="chatHeader">
                    <strong>{activeChatProfile.name}</strong>
                    <span>{activeChatProfile.catchCopy}</span>
                  </div>
                  <div className="chatMessages">
                    {activeMessages.map((message, index) => (
                      <div key={index} className={`chatBubble ${message.from}`}>
                        {message.text}
                      </div>
                    ))}
                  </div>
                  <div className="chatComposer">
                    <input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="メッセージを入力"
                    />
                    <button className="primaryButton" onClick={handleSend}>送信</button>
                  </div>
                </>
              ) : (
                <div className="chatEmpty">まずは相手に「いいね」してマッチさせてください。</div>
              )}
            </div>
          </div>
        </aside>
      </section>

      {detailProfile && (
        <div className="modalOverlay" onClick={() => setDetailProfile(null)}>
          <div className="detailModal" onClick={(e) => e.stopPropagation()}>
            <div
              className="detailImage"
              style={{ backgroundImage: `url(${detailProfile.image})` }}
            />
            <div className="detailBody">
              <h2>{detailProfile.name} <span>{detailProfile.age}</span></h2>
              <p className="detailMeta">{detailProfile.area} / {detailProfile.occupation}</p>
              <div className="tagList">
                {detailProfile.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <p className="detailBio">{detailProfile.bio}</p>
              <div className="cardActions">
                <button className="ghostButton" onClick={() => setDetailProfile(null)}>閉じる</button>
                <button className="primaryButton" onClick={() => handleLike(detailProfile)}>いいね</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}