/**
 * Spam trap: hidden from people and assistive technology, left empty by real visitors.
 * Automated form fillers tend to complete every input, which lib/form-guard.ts then discards.
 */
export default function HoneypotField() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}
