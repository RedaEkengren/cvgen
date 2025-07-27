# Analytics System Deployment Commands

## 🚀 Deploy to Production Server

**SSH till servern och kör följande:**

```bash
# SSH till produktionsservern
ssh user@178.128.143.51

# Gå till applikationsmappen
cd /var/www/cv-generator

# Hämta senaste analytics-koden
git pull origin main

# Installera nya dependencies för analytics
npm install

# Bygg frontend med analytics
npm run build

# Starta om backend med analytics
pm2 restart cv-backend

# Vänta på server restart
sleep 3

# Testa att analytics fungerar
curl http://localhost:3000/api/health
curl http://localhost:3000/api/analytics/popularity

# Kontrollera PM2 status
pm2 status
pm2 logs cv-backend --lines 10
```

## 📊 Test Analytics System

**1. Öppna applikationen:**
```
http://178.128.143.51
```

**2. Testa template tracking:**
- Gå till "Förhandsgranska" 
- Växla mellan olika CV-mallar (Modern, Executive, Creative, etc.)
- Generera några PDF:er
- Varje interaktion ska trackas automatiskt

**3. Kontrollera analytics dashboard:**
```
http://178.128.143.51/analytics
```

**4. API endpoints för test:**
```bash
# Popularity ranking
curl http://178.128.143.51/api/analytics/popularity

# Full analytics report  
curl http://178.128.143.51/api/analytics/report

# Daily report
curl http://178.128.143.51/api/analytics/daily

# Weekly trends
curl http://178.128.143.51/api/analytics/trends
```

## 🔍 Monitoring & Verification

**Analytics filer på servern:**
```bash
# Kontrollera analytics data
cat /var/www/cv-generator/analytics-data.json
cat /var/www/cv-generator/daily-analytics.json

# Övervaka real-time
tail -f /var/www/cv-generator/analytics-data.json
```

**Server logs:**
```bash
# PM2 logs för analytics tracking
pm2 logs cv-backend | grep Analytics

# Nginx access logs
tail -f /var/log/nginx/access.log | grep analytics
```

## ✅ Success Verification

**Kontrollera att följande fungerar:**

1. ✅ **Frontend** laddar med nya analytics-funktioner
2. ✅ **Analytics Dashboard** tillgänglig på `/analytics`
3. ✅ **Template tracking** fungerar när användare växlar mallar
4. ✅ **PDF tracking** registrerar downloads
5. ✅ **API endpoints** returnerar analytics data
6. ✅ **Real-time updates** i dashboard

**Expected Analytics Data:**
- Template views ökar när användare navigerar
- PDF downloads registreras när export sker
- Session tracking följer användaraktivitet
- Dashboard visar popularity ranking
- Weekly trends visar aktivitetsmönster

## 🎯 Next Steps

**Efter deployment:**
1. Låt systemet samla data från riktiga användare
2. Monitorera vilka mallar som blir populärast
3. Analysera conversion rates (views → downloads)
4. Optimera template-ordning baserat på data
5. Identifiera mallar som behöver förbättras

**🚀 Nu är analytics live och redo att samla riktig användardata!**