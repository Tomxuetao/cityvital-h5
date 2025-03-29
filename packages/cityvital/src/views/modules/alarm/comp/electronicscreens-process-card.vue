<script setup>
defineProps({
		processLists: {
			type: Array,
			required: true
		}
	})
</script>
<template>
	<div class="process-card">
		<div class="card-steps">
			<div class="step-item" v-for="(item, index) in processLists" :key="index">
				<div class="item-round">
					<div :class="['round-inner']"></div>
				</div>
				<div class="ctx-wrap">
					<div
						class="ctx-item"
					>
						<div class="item-header">
							<div class="header-ctx">
								<div class="header-title">{{ item.title }}</div>
							</div>
						</div>
						<div class="item-text">
							{{ item.content }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped lang="scss">
.process-card {
  .card-steps {
    .step-item {
      display: grid;
      grid-gap: 0 5px;
      grid-template-columns: 14px 1fr;

      .item-round {
        position: relative;

        .round-inner {
          width: 14px;
          height: 14px;

          &:after {
            position: absolute;
            content: "";
            top: 3px;
            left: 3px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: rgba(1, 193, 163, 1);
          }
        }

        .inner-active {
          display: flex;
          align-items: center;

          &:before {
            position: absolute;
            content: "";
            width: 14px;
            height: 14px;
            opacity: 0.2;
            border-radius: 50%;
            background-color: rgba(4, 130, 255, 1);
          }

          &:after {
            position: absolute;
            content: "";
            top: 3px;
            left: 50%;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            transform: translate(-50%, 0);
            background-color: rgba(4, 130, 255, 1);
          }
        }
      }

      .ctx-wrap {
        display: grid;
        grid-gap: 8px 0;
        min-height: 84px;
        margin-top: -5px;
        margin-bottom: 24px;

        .ctx-item {
          .item-header {
            display: flex;
            margin-bottom: 4px;
            align-items: center;
            justify-content: space-between;

            .header-ctx {
              display: flex;
              align-items: center;

              .header-title {
                height: 24px;
                color: #333333;
                font-weight: 600;
                line-height: 24px;
                margin-right: 12px;
              }

              .header-time {
                height: 22px;
                font-size: 14px;
                color: #999999;
                line-height: 22px;
              }
            }
          }

          .item-text {
            font-size: 14px;
            color: #666666;
            line-height: 22px;
          }
        }
      }

      &:nth-child(-n + 1) {
        .item-round {
          position: relative;

          &:after {
            position: absolute;
            height: calc(100% - 12px);
            content: "";
            left: 50%;
            top: 12px;
            transform: translateX(-50%);
            border: 0.5px dashed #dddddd;
          }
        }
      }
    }
  }
}
</style>
