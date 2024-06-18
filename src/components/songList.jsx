import React from 'react';

function SongList({ songs }) {
    return (
        <div className="song-list">
            {songs.length > 0 ? (
                songs.map((song) => (
                    <div key={song.id} className="song-item">
                        <img src={song.album.images[0].url} alt={song.name} />
                        <div>
                            <h2>{song.name}</h2>
                            <p>{song.artists.map(artist => artist.name).join(', ')}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No songs found</p>
            )}
        </div>
    );
}

export default SongList;
