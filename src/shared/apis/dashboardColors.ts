export type DashboardColorName =
  | 'pink'
  | 'orange'
  | 'yellow'
  | 'blue'
  | 'purple';

export type DashboardColor = {
  id: DashboardColorName;
  hex: string;
};

/**
 * colors.css에 전역 색상 토큰이 정의되어 있더라도,
 * 이 맵은 "대시보드에서 선택 가능한 색상이 무엇인가"라는 도메인 정보를 담습니다.
 *
 * Record<DashboardColorName, string>을 사용하여 타입에 색상을 추가하면
 * 반드시 이 맵에도 추가하도록 컴파일 타임에 강제합니다.
 *
 * @warning
 * Tailwind는 빌드 시 정적 분석으로 클래스를 추출하므로, 동적으로 조합된 클래스는
 * purge되어 프로덕션 환경에서 스타일이 적용되지 않을 수 있기 때문에 현재 방식을 사용했습니다.
 */
const DASHBOARD_COLOR_MAP: Record<DashboardColorName, string> = {
  pink: 'var(--color-pink)',
  orange: 'var(--color-orange)',
  yellow: 'var(--color-yellow)',
  blue: 'var(--color-blue)',
  purple: 'var(--color-purple)',
};

const DASHBOARD_COLORS: DashboardColor[] = (
  Object.entries(DASHBOARD_COLOR_MAP) as [DashboardColorName, string][]
).map(([id, hex]) => ({ id, hex }));

/**
 * 대시보드에서 사용할 색상 목록을 조회합니다.
 *
 * @example
 * ```tsx
 * const dashboardColors = getDashboardColors();
 * ```
 */
export const getDashboardColors = function (): DashboardColor[] {
  return DASHBOARD_COLORS;
};

/**
 * 색상 이름으로 대시보드 색상 정보를 조회합니다.
 *
 * @example
 * ```tsx
 * const dashboardColor = getDashboardColorById('blue');
 * ```
 */
export const getDashboardColorById = function (
  colorId: DashboardColorName
): DashboardColor {
  return { id: colorId, hex: DASHBOARD_COLOR_MAP[colorId] };
};

/**
 * 선택된 대시보드 색상 이름에 해당하는 hex 값을 조회합니다.
 *
 * 컬러칩셋에서 선택한 색상 이름을 라벨, 카드, 배지 같은 UI에 연결할 때 사용할 수 있습니다.
 *
 * @example
 * ```tsx
 * const selectedColor = 'blue';
 * const colorHex = getDashboardColorHex(selectedColor);
 *
 * <ColorLabel color={colorHex} label="회의록" />
 * ```
 */
export const getDashboardColorHex = function (
  colorId: DashboardColorName
): string {
  return DASHBOARD_COLOR_MAP[colorId];
};
