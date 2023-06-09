import React from 'react';
import s from './UserChat.module.css'

export const UserChatPlaceholder = () => {
      return (
            <div className={s.placeholder}>
                  <div className={s.placeholderContent}>
                        Начните диалог...
                  </div>
            </div>
      );
}
