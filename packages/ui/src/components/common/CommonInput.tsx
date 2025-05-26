import React from 'react';
import { Input } from '../base/input';

export default function CommonInput() {
  return (
    <div className="grid w-full items-center gap-1.5">
      <label
        htmlFor="email"
        className="font-semibold text-[13px] text-gray-3 ms-1"
      >
        이메일 주소
      </label>
      <Input type="email" id="email" placeholder="abc@email.com" />
    </div>
  );
}
