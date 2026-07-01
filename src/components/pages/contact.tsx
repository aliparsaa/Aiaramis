'use client';

import { useState } from 'react';
import { useLeadStore } from '@/stores/cart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ContactPage() {
  const addEmail = useLeadStore((s) => s.addEmail);
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.email) addEmail(form.email, 'contact-form');
    toast({ title: 'پیام شما ارسال شد', description: 'کارشناسان ما در اسرع وقت با شما تماس خواهند گرفت.' });
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-3xl font-bold">تماس با ما</h1>
        <p className="text-muted-foreground mt-2">ما آماده پاسخگویی به سوالات شما هستیم</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { icon: <Phone className="w-5 h-5" />, title: 'تلفن', value: '۰۲۱-۱۲۳۴۵۶۷۸', sub: 'شنبه تا پنج‌شنبه ۹-۱۸' },
          { icon: <Mail className="w-5 h-5" />, title: 'ایمیل', value: 'info@aiaramis.ir', sub: 'پاسخ‌گویی در کمتر از ۲۴ ساعت' },
          { icon: <MapPin className="w-5 h-5" />, title: 'آدرس', value: 'تهران، خیابان ولیعصر', sub: 'پلاک ۱۲۳، طبقه ۴' },
        ].map((item) => (
          <Card key={item.title}>
            <CardContent className="p-5 text-center space-y-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto">
                {item.icon}
              </div>
              <h3 className="font-bold text-sm">{item.title}</h3>
              <p className="text-sm">{item.value}</p>
              <p className="text-xs text-muted-foreground">{item.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            ارسال پیام
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">نام و نام خانوادگی</label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="نام شما" required />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">شماره تماس</label>
                <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="۰۹۱۲XXXXXXX" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">ایمیل</label>
              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" required />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">پیام</label>
              <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="پیام خود را بنویسید..." rows={5} required />
            </div>
            <Button type="submit" className="w-full" size="lg">
              <Send className="w-4 h-4 ml-2" />
              ارسال پیام
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}