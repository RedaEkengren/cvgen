# 🛡️ CV Generator Backup & Sync Strategy

## Problem som måste förhindras:
- ❌ Kodförlust vid merge conflicts
- ❌ Överskrivning av fungerande kod
- ❌ Förlorade commits vid git operations
- ❌ Osynkroniserade versioner mellan lokal/git/server

## 🔄 Automatisk Backup Strategi

### 1. Daglig Automatisk Backup (Server)
```bash
# Skapa cron job för daglig backup
0 3 * * * /var/www/cv-generator/backup-server.sh > /var/log/cv-backup.log 2>&1
```

### 2. Pre-Deployment Backup
**ALLTID innan deployment:**
```bash
# Kör detta INNAN varje deployment
ssh claude@178.128.143.51 "cd /var/www/cv-generator && sudo ./backup-server.sh"
```

### 3. Git Sync Verifiering
**Innan stora ändringar:**
```bash
# Verifiera att alla tre platser har samma version
# Lokal
git log --oneline -1

# GitHub
git ls-remote origin HEAD

# Server
ssh claude@178.128.143.51 "cd /var/www/cv-generator && git log --oneline -1"
```

## 📋 Deployment Checklist

### FÖRE deployment:
- [ ] Kör backup-server.sh på servern
- [ ] Verifiera att sidan fungerar (test på learningwithreda.com)
- [ ] Dokumentera vilken funktionalitet som finns
- [ ] Git commit lokalt med beskrivande meddelande

### UNDER deployment:
- [ ] ALDRIG använd `git reset --hard` utan backup
- [ ] ALDRIG använd `--force` utan att dubbelkolla
- [ ] Vid merge conflicts - ALLTID välj den version som har thumbnail selector

### EFTER deployment:
- [ ] Testa ALLA funktioner på produktion
- [ ] Verifiera att thumbnail selector fungerar
- [ ] Kontrollera att PDF-generering fungerar
- [ ] Säkerställ att rate limiting är aktivt

## 🚨 Emergency Recovery

### Om kod försvinner:
1. **Server backup:**
   ```bash
   ls -la /var/backups/cv-generator/
   # Välj senaste backup och kör restore-server.sh
   ```

2. **Git recovery:**
   ```bash
   git reflog  # Se alla tidigare commits
   git checkout <commit-hash>  # Återställ till fungerande version
   ```

3. **Production dist folder:**
   - Alltid finns kompilerad kod i `/var/www/cv-generator/dist/`
   - Kan användas som referens för vad som faktiskt körs

## 🔑 Kritiska filer att bevaka:
1. `/src/pages/LandingPage.jsx` - Måste ha thumbnail selector kod
2. `/server.js` - Måste ha IPv6 rate limiting fix
3. `/nginx-config-fix.conf` - Måste peka på dist-mappen
4. `/dist/` - Kompilerad kod som faktiskt körs

## ⚡ Quick Commands

### Skapa snapshot av fungerande version:
```bash
ssh claude@178.128.143.51 "cd /var/www/cv-generator && tar -czf snapshot-$(date +%Y%m%d-%H%M%S).tar.gz src/ dist/ server.js"
```

### Verifiera thumbnail selector finns:
```bash
ssh claude@178.128.143.51 "grep -n 'template-grid-compact' /var/www/cv-generator/dist/assets/index-*.js | wc -l"
# Bör returnera minst 1
```

## 📝 Version Tracking
**Current Working Version (2025-07-28):**
- ✅ Thumbnail selector med 8 CV-mallar
- ✅ Rate limiting 10 PDFs/15min
- ✅ IPv6 support
- ✅ Alla buttons centrerade
- ✅ PDF generation fungerar för alla mallar