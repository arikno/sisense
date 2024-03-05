/*
Welcome to your Dashboard's Script.

To learn how you can access the Widget and Dashboard objects, see the online documentation at https://sisense.dev/guides/js/extensions
*/


dashboard.on('refreshstart', onDashboardRefreshStart);

function onDashboardRefreshStart() {
  var dateFilterName = "Date";
  var secondDateFilterName = "Date_Second";
  var fromDate = "";
  var toDate = "";

  // ---------- Find date filter ----------
  let dateFilter = dashboard.filters.$$items.find((item) => {
    if (item.jaql && item.jaql.title.indexOf(dateFilterName) !== -1) {
      return true;
    }
  });

  // ---------- Find second_date filter ----------
  let secondDateFilter = dashboard.filters.$$items.find((item) => {
    if (item.jaql && item.jaql.title.indexOf(secondDateFilterName) !== -1) {
      return true;
    }
  });

  var selectedYear = dateFilter.jaql.filter.members[0].slice(0, 4);
  var selectedGranularity = dateFilter.jaql.level;

	
  if (selectedGranularity === "months") {
    fromDate = selectedYear + "-01-01";
    var selectedMonth = dateFilter.jaql.filter.members[0].slice(5, 7);
    var endOfMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    var toDate = selectedYear + "-" + selectedMonth + "-" + endOfMonth;
  }
		
	 else if (selectedGranularity === "quarters") {
    fromDate = selectedYear + "-01-01";	  
    var endqtrMonth = parseInt(dateFilter.jaql.filter.members[0].slice(5, 7)) + 2;
	var selectedMonth = endqtrMonth.toString().padStart(2, "0")
    var endOfqtr = new Date(selectedYear, selectedMonth, 0).getDate();
    var toDate = selectedYear + "-" + selectedMonth + "-" + endOfqtr;
  }
  	

  // Check if the filter update has already been performed
  var isFilterUpdated = secondDateFilter.jaql.filter.from === fromDate && secondDateFilter.jaql.filter.to === toDate;

  if (!isFilterUpdated) {
    // Update the second_date filter with new from and to values
    secondDateFilter.jaql.filter.from = fromDate;
    secondDateFilter.jaql.filter.to = toDate;
	  
	      // Refresh and save the filter
    dashboard.filters.update(secondDateFilter, { refresh: true, save: true });
	  
  }
	
}
