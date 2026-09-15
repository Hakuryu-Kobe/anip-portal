// Career Portal v4.1 — monthly Japan job-hunting goals
// Seeds roadmap tasks once, while preserving existing localStorage tasks.
(() => {
  const GOALS = [
    ['2026-09-30','9月｜候補企業・組織マップを15〜20件まで整理','企業研究'],
    ['2026-10-31','10月｜Experience Bankを70〜80%まで完成','自己分析'],
    ['2026-11-30','11月｜主要シンクタンク5社以上を研究し、興味がある／ない理由を説明できる状態にする','企業研究'],
    ['2026-12-31','12月｜経済安保・地政学／安全保障コンサルを比較し、第1群5社＋第2群5〜10社を整理','企業研究'],
    ['2027-01-31','1月｜専門性（IR→IPE→経済安保→SC／台湾）と志望軸を2〜3分で説明できるようにする','キャリア軸'],
    ['2027-02-28','2月｜ESの素材を整理し、主要経験を応募書類に変換できる状態にする','選考準備'],
    ['2027-03-31','3月｜ES・Webテスト・面接対策を進め、コンサル向けCase／GDにも着手','選考準備'],
    ['2027-04-30','4月｜夏インターン応募可能な状態を作り、締切・卒業時期・入社時期を管理','応募'],
    ['2027-05-31','5月｜夏インターン／関連選考への提出を進める','応募'],
    ['2027-06-30','6月｜面接・GD・Case対策を実戦レベルまで進める','選考準備'],
    ['2027-07-31','7月｜インターン参加時に①調査→②リスク評価→③対応策→④提言の実態を検証','実地検証'],
    ['2027-08-31','8月｜インターン経験を振り返り、専門性・案件選択・政策／企業向けのFitを更新','実地検証'],
    ['2027-09-30','9月｜BCF・秋冬インターン・本選考候補と締切を整理','応募'],
    ['2027-10-31','10月｜秋冬選考を進め、企業マップの優先順位を実体験・選考情報で更新','応募'],
    ['2027-11-30','11月｜本選考に向けて応募先・志望理由・選考準備を最終整理','応募']
  ];

  function seedMonthlyGoals(){
    if (typeof state === 'undefined' || !Array.isArray(state.tasks)) return;
    const existing = new Set(state.tasks.map(t => `${t.title}|${t.due}`));
    let changed = false;
    GOALS.forEach(([due,title,category]) => {
      if (!existing.has(`${title}|${due}`)) {
        state.tasks.push({id: typeof uid === 'function' ? uid() : `career-${due}`, title, category, status:'To Do', due});
        changed = true;
      }
    });
    if (changed && typeof save === 'function') save();
  }

  seedMonthlyGoals();
  if (typeof render === 'function') render();
})();
